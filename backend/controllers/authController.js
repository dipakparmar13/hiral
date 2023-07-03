const bcrypt = require("bcrypt");
var jwttoken = require("jsonwebtoken");
const generator = require("generate-password");
const saltRounds = 10;
const {
  emailService,
  profilePhoto,
  userService,
  sendMessage,
} = require("../service");
const Users = require("../models/Users");
const verifyOTPAdd = require("../models/VerifyOTP");
const Organization = require("../models/Organization");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const path = require("path");

const Signup = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      address,
      email,
      number,
      company_name,
      device_type,
      device_token,
      register_type,
      login_type,
      user_type,
    } = req.body;
    await Users.findOne({ $and: [{ number: number }, { email: email }] }).then(
      (user) => {
        if (user) {
          res.status(409).json({ status: 409, message: "Alredy exiest." });
        } else {
          const user = new Users({
            first_name: first_name,
            last_name: last_name,
            address: address,
            number: number,
            email: email,
            company_name: company_name,
            device_type: device_type,
            device_token: device_token,
            register_type: register_type,
            login_type: login_type,
            user_type: user_type,
          });
          user.save(user).then((data) => {
            res.json({
              success: 200,
              message: "User successfully created!",
            });
          });
        }
      }
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// const Signin = async (req, res, next) => {
//   const { email, password, device_type, device_token, register_type } =
//     req.body;
//   await Users.findOne({ email: email }).then(async (data) => {
//     if (!data) {
//       res.json({
//         status: 400,
//         message: "Please enter your valid email.",
//       });
//     } else {
//       const cmp = await bcrypt.compare(password, data.password);
//       if (cmp) {
//         var token = jwttoken.sign(
//           { id: data.id, email: data.email },
//           config.jwtSecret,
//           {
//             expiresIn: 60 * 60 * 24,
//           } // 24 hours
//         );
//         await Users.findByIdAndUpdate(
//           { _id: data._id },
//           { device_type, device_token, register_type },
//           {
//             useFindAndModify: false,
//           }
//         ).then((data) => {
//           if (!data) {
//             res.status(404).send({
//               message: `not updated`,
//             });
//           } else {
//             res.json({
//               status: 200,
//               message: "login successfully",
//               accessToken: token,
//               data: {
//                 first_name: data.first_name,
//                 last_name: data.last_name,
//                 email: data.email,
//               },
//             });
//           }
//         });
//       } else {
//         res.json({ status: 400, message: "Invalid password." });
//       }
//     }
//   });
// };

const verifyOtp = async (req, res, next) => {
  var tenMinutesOld = new Date();
  tenMinutesOld.setMinutes(tenMinutesOld.getMinutes() - 10);
  verifyOTPAdd
    .findOne({
      $and: [
        { number: req.body.number },
        { otp: req.body.otp },
        { created_at: { $gt: new Date(tenMinutesOld).getTime() } },
      ],
    })
    .then(async (data) => {
      if (data?.otp === req.body.otp) {
        await Users.findOne({ number: data.number }).then(async (item) => {
          if (item) {
            var token = jwttoken.sign(
              { id: item?.id, email: item?.email, number: item?.number },
              config.jwtSecret,
              {
                expiresIn: 60 * 60 * 24,
              } // 24 hours
            );
            verifyOTPAdd.deleteOne({ number: item.number }).then();
            res.status(200).json({
              success: 200,
              message: "OTP verify succefully.",
              token: token,
            });
          } else {
            const user = new Users({
              number: data.number,
            });
            user.save(user).then((data) => {
              var token = jwttoken.sign(
                { id: data?.id, email: data?.email, number: data?.number },
                config.jwtSecret,
                {
                  expiresIn: 60 * 60 * 24,
                } // 24 hours
              );
              verifyOTPAdd.deleteOne({ number: data.number }).then();
              res.status(200).json({
                success: 200,
                message: "OTP verify succefully.",
                token: token,
              });
            });
          }
        });
      } else if (!data) {
        res.status(400).json({ message: "Please enter a valide OTP." });
      }
    })
    .catch(() => {
      res.status(409).json({ message: "Please enter a valide OTP." });
    });
};
const verifyEmail = async (req, res, next) => {
  const { token, email } = req.body;

  var tenMinutesOld = new Date();
  tenMinutesOld.setMinutes(tenMinutesOld.getMinutes() - 10);

  const decodeEmail = jwt.decode(token);
  console.log("decodeEmail", decodeEmail);
  const socialEmail = decodeEmail?.preferred_username || decodeEmail?.email;
  verifyOTPAdd
    .findOne({
      $and: [
        { email: decodeEmail ? socialEmail : email },
        { otp: req.body.otp },
        { created_at: { $gt: new Date(tenMinutesOld).getTime() } },
      ],
    })
    .then(async (data) => {
      if (data?.otp === req.body.otp) {
        await Users.findOne({
          email: decodeEmail ? socialEmail : email,
        }).then((item) => {
          if (item) {
            var token = jwttoken.sign(
              { id: item?.id, email: item?.email, number: item?.number },
              config.jwtSecret,
              {
                expiresIn: 60 * 60 * 24,
              }
            );
            verifyOTPAdd.deleteOne({ email: item.email }).then();
            res.status(200).json({
              success: 200,
              message: "OTP verify succefully.",
              token: token,
            });
          } else if (item === null) {
            let extraDetails = {};
            if (token) {
              extraDetails = {
                register_type: req.body.register_type,
                device_token: req.body.device_token,
                device_type: req.body.device_type,
              };
            }
            const user = new Users({
              email: data.email,
              first_name: decodeEmail?.name
                ? decodeEmail.name.split(" ")[0]
                : decodeEmail.given_name,
              last_name: decodeEmail?.name
                ? decodeEmail.name.split(" ")[1]
                : decodeEmail.family_name,
              ...extraDetails,
            });

            user.save(user).then((data) => {
              var token = jwttoken.sign(
                { id: data?.id, email: data?.email, number: data?.number },
                config.jwtSecret,
                {
                  expiresIn: 60 * 60 * 24,
                } // 24 hours
              );
              verifyOTPAdd.deleteOne({ email: data.email }).then();
              res.status(200).json({
                success: 200,
                message: "OTP verify succefully.",
                token: token,
              });
            });
          }
        });
      } else if (!data) {
        res.status(400).json({
          success: 400,
          message: "Please enter a valide OTP.",
        });
      }
    })
    .catch(() => {
      res.status(409).json({
        success: 400,
        message: "Please enter a valide OTP.",
      });
    });
};

const forgotPassword = async (req, res, next) => {
  const { email, number } = req.body;
  try {
    var password = generator.generateMultiple(1, {
      length: saltRounds,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
    });
    const hashedPwd = await bcrypt.hash(password[0] + "@", saltRounds);
    let user;
    if (email) {
      user = await Users.findOne({ email: email });
    } else if (number) {
      user = await Users.findOne({ number: number });
    }
    if (!user) {
      res.status(404).send({
        message: `Please enter valid ${email ? "email" : "phone numbber"}`,
        status: 400,
      });
    } else {
      let data = {
        password: hashedPwd,
      };
      Users.findByIdAndUpdate({ _id: user._id }, data, {
        useFindAndModify: false,
      }).then(async (data) => {
        if (!data) {
          res.status(404).send({
            message: `not updated`,
          });
        } else {
          if (email) {
            await emailService.sendEmail({
              from: config.mailTrap.email,
              to: req.body.email,
              subject: "Welcome to Neobox",
              text: "Hay dear your Neobox Website password => " + password[0],
            });
          } else {
            sendMessage.sendMessage({
              number: number,
              message:
                "Hay dear your Neobox Website password => " + password[0],
            });
          }
          res.json({
            success: 200,
            user: {
              email: data.email,
              password: password[0] + "@",
            },
            message: "Password updated",
          });
        }
      });
    }
  } catch (error) {
    res.json({
      success: 400,
      message: error.message,
    });
  }
};

const changePassword = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const hashedPwd = await bcrypt.hash(password, saltRounds);
    const user = await Users.findOne({ email: email });

    if (!user) {
      res.status(404).send({
        message: "Please enter valid email.",
        status: 400,
      });
    } else {
      let data = {
        email: email,
        password: hashedPwd,
      };
      Users.findByIdAndUpdate({ _id: user._id }, data, {
        useFindAndModify: false,
      }).then((data) => {
        if (!data) {
          res.status(404).send({
            message: `not updated`,
          });
        } else {
          res.json({
            success: 200,
            message: "your password " + password + " update successfully.",
          });
        }
      });
    }
  } catch (error) {
    res.json({
      success: 400,
      message: error.message,
    });
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    let profile = null;
    if (!!req.files.profile_image) {
      profile = await profilePhoto.profilePhoto(
        req.files.profile_image[0],
        "profiles"
      );
    }
    let updateData = { ...req.body, profile_image: profile };
    await Users.findByIdAndUpdate({ _id: id }, updateData).then(
      async (userdata) => {
        if (!userdata) {
          res.status(404).send({
            message: `not updated`,
          });
        } else {
          const userData = await userService.getUserByID(userdata.id);
          res.json({
            success: 200,
            data: userData,
            message: "User info updated successfully.",
          });
        }
      }
    );
  } catch (error) {
    res.json({ status: 400, message: error });
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const userdata = await Users.findById(id);
    const organization = await Organization.find({ user_id: userdata._id });
    if (userdata) {
      res.status(200).json({
        status: 200,
        message: "fetch data successfully",
        data: { user: userdata._doc, organization: organization[0] },
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
const getUserProfilePic = async (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../uploads/profiles/thumb/" + req.params.profile_image
    )
  );
};
const getAllUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const userdata = await Users.find({});
    if (userdata) {
      res.status(200).json({
        status: 200,
        message: "fetch data successfully",
        userdata,
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

module.exports = {
  // Signin,
  Signup,
  forgotPassword,
  updateUser,
  getUser,
  getAllUser,
  changePassword,
  verifyOtp,
  verifyEmail,
  getUserProfilePic,
};
