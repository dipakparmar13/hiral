const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
    default: null,
  },
  logo: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  phone_number: {
    type: Number,
    default: null,
  },
  tax_number: {
    type: Number,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  country: {
    type: String,
    require: true,
    default: null,
  },
  postal_code: {
    type: Number,
    default: null,
  },
  created_at: { type: Date, default: Date.now() },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model("organizations", OrganizationSchema);
