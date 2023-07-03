const { VerifyOTP, Invitation, Customer, User } = require("../models");
const { profilePhoto, userService, emailService } = require("../service/index");
const config = require("../utils/config");
const nodeMailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const addInvitation = async (req, res, next) => {
  try {
    const { id } = req.user;
    const Invitation_profile = await profilePhoto.profilePhoto(
      req.files.logo[0],
      "invitation"
    );
    let updateData = { ...req.body, logo: Invitation_profile };

    const is_invitation = await Invitation.find({
      mobile_number: req.body.mobile_number,
      organization_type: req.body.organization_type,
    });
    if (is_invitation.length > 0) {
      return res.status(400).send({
        message: "The organization is associated with this mobile number!",
      });
    }
    const invitation = new Invitation({
      user_id: id,
      ...updateData,
    });
    invitation.save(invitation).then((data) => {
      res.json({
        success: 200,
        message: "invitation successfully created!",
      });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const invitationSend = async (req, res, next) => {
  try {
    const { id } = req.user;
    //create 5 digit OTP
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 5; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    if (!req.body.email && !req.body.mobile_number) {
      return res.status(400).json({
        message: "Please select platfrom for invite",
      });
    }
    if (req.body.email) {
      const reqPath = path.join(__dirname, "../");
      const URL = `${process.env.REACT_APP_PUBLIC_URL}/images/neobox_logo.png`;
      await ejs.renderFile(
        reqPath + "templates/sendOtp.ejs",
        { OTP, URL },
        async (err, data) => {
          emailService.sendEmail({
            from: process.env.MAILTRAP_EMAIL,
            to: req.body.email,
            subject: "Neobox",
            html: data,
          });
        }
      );
    }

    User.aggregate([
      {
        $match: { email: req.body.email, number: req.body.mobile_number },
      },
    ]).then((item) => {
      const invitation = new Invitation({
        invited_by_id: id,
        invited_user_id: item.length > 0 ? item[0]._id : null,
        invitation_code: OTP,
        ...req.body,
      });
      invitation.save(invitation).then((data) => {
        res.json({
          success: 200,
          invitation_code: OTP,
          message: "invitation successfully created!",
        });
      });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getInvitation = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { status, search_name } = req.query;

    let invitation_filter = [];
    // invitation_filter.push({
    //   $match: { organization_type: { $regex: new RegExp(search_name, "i") } },
    // });
    if (status) {
      invitation_filter.push({
        $match: { status: Number(status) },
      });
    }
    invitation_filter.push({
      $match: { invited_by_id: mongoose.Types.ObjectId(id), is_deleted: 0 },
    });
    invitation_filter.push({
      $lookup: {
        from: "organizations",
        localField: "organization_id",
        foreignField: "_id",
        as: "organization",
      },
    });
    invitation_filter.push({
      $lookup: {
        from: "users",
        localField: "invited_user_id",
        foreignField: "_id",
        as: "user",
      },
    });

    if (search_name) {
      invitation_filter.push({
        $match: {
          $or: [
            {
              "user.first_name": { $regex: new RegExp(search_name, "i") },
            },
            { "user.last_name": { $regex: new RegExp(search_name, "i") } },
          ],
        },
      });
    }
    // invitation_filter.push({
    //   $match: {
    //     "user.first_name": search_name,
    //     "user.last_name": search_name,
    //   },
    // });
    const invitation = await Invitation.aggregate(invitation_filter)
      .sort({ organization_type: 1 })
      .exec();

    if (invitation) {
      res.status(200).json({
        status: 200,
        message: "fetch invitation successfully",
        user: invitation,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Something Went wrong with Retrieving data",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getStatusWiseInvitation = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < (await Invitation.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.currentPage = page;
    let invitationTotal = await Invitation.find({
      mobile_number: req.query.number,
      status: req.query.status,
    });
    results.totalPages = Math.ceil(invitationTotal.length / limit);

    let invitation = await Invitation.aggregate([
      {
        $match: {
          $and: [
            {
              status: req.query.status,
              is_deleted: 0,
              $or: [
                {
                  mobile_number: !req.query.mobile_number
                    ? ""
                    : req.query.mobile_number,
                },
                { email: !req.query.email ? "" : req.query.email },
              ],
            },
          ],
        },
      },
      {
        $lookup: {
          from: "organizations",
          localField: "organization_id",
          foreignField: "_id",
          as: "organization",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "invited_by_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: {
          "organization.name": {
            $regex: new RegExp(req.query.search_name, "i"),
          },
        },
      },
    ])
      .limit(limit)
      .skip(startIndex)
      .sort({ organization_type: 1 })
      .exec();
    results.invitation = invitation;

    res.status(200).json({
      message: "fetch invitation successfully",
      results,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const verifyInvitation = async (req, res, next) => {
  try {
    const { id } = req.user;
    await Invitation.findOneAndUpdate(
      { $and: [{ invitation_code: req.body.invitation_code }] },
      { status: 1, invited_user_id: id },
      {
        useFindAndModify: false,
      }
    ).then(async (invitation) => {
      if (!invitation) {
        res.status(404).send({
          message: `Enter your valide Invitation code`,
        });
      } else {
        const customer = await Customer.findOne({
          user_id: invitation.invited_by_id,
        });
        let cusData = {
          user_id: invitation.invited_by_id,
          customer_id: [id],
        };
        if (customer) {
          Customer.updateOne(
            { user_id: invitation.invited_by_id },
            {
              user_id: invitation.invited_by_id,
              $set: { customer_id: [id] },
            }
          )
            .then((result) => {
              res.json({
                success: 200,
                message: "invitation verify and customer successfully created!",
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const customer = new Customer(cusData);
          customer.save(customer).then((data) => {
            res.json({
              success: 200,
              message: "invitation updated and customer successfully created!",
            });
          });
        }
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const smsInvitation = async (req, res, next) => {
  try {
    const { number } = req.body;
    // if (type === "buyer") {
    const userExist = await User.findOne({ number: number });
    if (userExist) {
      const verifyOTP = await userService.findVerifyOTP();
      if (verifyOTP) {
        const deleteOTP = await userService.deleteVerifyOTP();
        if (deleteOTP.deletedCount > 0) {
          const otp = await userService.sendSMS(number);
          if (otp) {
            res
              .status(200)
              .json({ status: 200, otp, message: "OTP send successfully!" });
          } else {
            res.status(400).json({
              status: 400,
              message: "OTP not send please try again!",
            });
          }
        }
      } else {
        const otp = await userService.sendSMS(number);
        if (otp) {
          res
            .status(200)
            .json({ status: 200, otp, message: "OTP send successfully!" });
        } else {
          res.status(400).json({
            status: 400,
            message: "OTP not send please try again!",
          });
        }
      }
    } else {
      res.status(400).json({
        status: 400,
        message: "No account found.",
      });
    }
    // } else {
    //   const verifyOTP = await userService.findVerifyOTP();
    //   if (verifyOTP) {
    //     const deleteOTP = await userService.deleteVerifyOTP();
    //     if (deleteOTP.deletedCount > 0) {
    //       const otp = await userService.sendSMS(number);
    //       if (otp) {
    //         res.status(200).json({ status: 200, otp });
    //       } else {
    //         res.status(400).json({
    //           status: 400,
    //           message: "otp send issue",
    //         });
    //       }
    //     }
    //   } else {
    //     const otp = await userService.sendSMS(number);
    //     if (otp) {
    //       res.status(200).json({ status: 200, otp });
    //     } else {
    //       res.status(400).json({
    //         status: 400,
    //         message: "otp send issue",
    //       });
    //     }
    //   }
    // }
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error.message);
  }
};

const emailInvitation = async (req, res, next) => {
  try {
    const { token, email } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist || token) {
      //create 5 digit OTP
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 5; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      const decodeEmail = jwt.decode(token);
      const socialEmail = decodeEmail?.preferred_username || decodeEmail?.email;
      const reqPath = path.join(__dirname, "../");
      const URL = `${process.env.REACT_APP_PUBLIC_URL}/images/neobox_logo.png`;
      const sendSMS = async () => {
        ejs.renderFile(
          reqPath + "templates/sendOtp.ejs",
          { OTP, URL },
          (err, data) => {
            var transporter = nodeMailer.createTransport({
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD,
              },
            });
            let mailOptions = {
              from: process.env.MAILTRAP_EMAIL,
              to: decodeEmail ? socialEmail : email,
              subject: "Neobox",
              html: data,
            };

            transporter.sendMail(mailOptions, async (error, info) => {
              if (error) {
                return res.status(400).json({
                  sucess: 400,
                  message: error.message,
                });
              }
              const verifyOTPAdd = await new VerifyOTP({
                email: decodeEmail ? socialEmail : email,
                otp: OTP,
                created_at: new Date(),
              });
              await verifyOTPAdd.save(verifyOTPAdd).then((data) => {
                if (data) {
                  res.status(200).json({
                    status: 200,
                    otp: OTP,
                    email: data.email,
                    message: "OTP send in email.",
                  });
                }
              });
            });
          }
        );
      };

      VerifyOTP.findOne({
        email: decodeEmail ? socialEmail : email,
      }).then(async (data) => {
        if (data) {
          VerifyOTP.deleteOne({
            email: decodeEmail ? socialEmail : email,
          }).then(async (item) => {
            if (item.deletedCount > 0) {
              await sendSMS();
            }
          });
        } else {
          await sendSMS();
        }
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No account found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const deleteInvitation = async (req, res, next) => {
  try {
    await Invitation.findOneAndUpdate(
      { _id: req.params.id },
      { is_deleted: 1 },
      {
        useFindAndModify: false,
      }
    ).then(async (invit) => {
      if (invit) {
        res.status(200).json({
          message: "Delete invitation successfully!!",
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateInvitation = async (req, res, next) => {
  try {
    await Invitation.findOneAndUpdate(
      { _id: req.body.id },
      { organization_type: req.body.organization_type },
      {
        useFindAndModify: false,
      }
    ).then(async (invit) => {
      if (invit) {
        res.status(200).json({
          message: "Update invitation successfully!!",
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  addInvitation,
  invitationSend,
  getInvitation,
  verifyInvitation,
  updateInvitation,
  smsInvitation,
  emailInvitation,
  getStatusWiseInvitation,
  deleteInvitation,
};
