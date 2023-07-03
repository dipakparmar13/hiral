const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  profile_image: {
    type: String,
    default: "",
  },
  first_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  number: {
    type: String,
    require: true,
    default: "",
  },
  company_name: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  device_token: {
    type: String,
    default: "",
  },
  device_type: {
    type: String,
    default: "",
  },
  login_type: {
    type: String,
    default: "number",
  },
  register_type: {
    type: String,
    default: "",
  },
  user_type: {
    type: String,
    default: "",
  },
  created_at: { type: Date, default: Date.now() },
  __v: { type: Number, select: false },
});

UserSchema.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("users", UserSchema);
