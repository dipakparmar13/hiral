const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  // desktop user
  user_id: {
    type: String,
    required: true,
  },
  customer_id: { type: Array, required: true }, // mobile user
  created_at: { type: Date, default: Date.now() },
  __v: { type: Number, select: false },
  // user_id: {
  //   type: String,
  //   required: true,
  // },
  // supplier_ids: { type: Array, required: true },
  // store_customer_id: {
  //   type: String,
  //   required: true,
  // },
  // invitation_code: {
  //   type: String,
  //   default: "",
  // },
  // organization_type: {
  //   type: String,
  //   default: "",
  // },
});

CustomerSchema.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("customers", CustomerSchema);
