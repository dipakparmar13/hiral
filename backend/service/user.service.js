const { User } = require("../models/index");
const VerifyOTP = require("../models/VerifyOTP");

const getUserByID = async (id) => {
  const userData = await User.findOne({
    _id: id,
  });
  return {
    id: userData.id,
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
    number: userData.number,
    country_code: userData.country_code,
    address: userData.address,
    city: userData.city,
    state: userData.state,
    zip_code: userData.zip_code,
    country: userData.country,
    profile_image: userData.profile_image,
    invitation_code: userData.invitation_code,
    organization_type: userData.organization_type,
  };
};
const findVerifyOTP = async (number) => {
  return VerifyOTP.findOne({ number: number });
};
const deleteVerifyOTP = async (number) => {
  return VerifyOTP.deleteOne({ number: number });
};
const sendSMS = async (number) => {
  // const client = require("twilio")(
  //   config.twilio.twilio_account_SID,
  //   config.twilio.twilio_auth_token
  // );
  // client.messages
  //   .create({
  //     body:
  //       "OTP to verify your primary mobile number NEOBOX is " +
  //       OTP +
  //       " (valid for 10 mins).",
  //     from: process.env.TWILIO_PHONE_NUMBER,
  //     to: req.body.number,
  //   })
  //   .then(async (message) => {
  // if (message) {

  //create 5 digit OTP
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 5; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  const verifyOTPAdd = await new VerifyOTP({
    number: number,
    otp: OTP,
    created_at: new Date(),
  });
  const otpData = await verifyOTPAdd.save(verifyOTPAdd).then((data) => {
    if (data) {
      return OTP;
    }
  });
  return otpData;
  // }
  // })
  // .catch((err) => {
  //   res.status(400).json({ status: 400, error: err.message });
  // });
};
module.exports = {
  getUserByID,
  sendSMS,
  findVerifyOTP,
  deleteVerifyOTP,
};
