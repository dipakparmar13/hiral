const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VerifyOTPSchema = new Schema({
  number: {
    type: String,
    default: "",
  },
  otp: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  created_at: { type: Date, default: Date.now() },
  __v: { type: Number, select: false },
});

VerifyOTPSchema.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("verifyOTP", VerifyOTPSchema);
