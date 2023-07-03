const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SupplierSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  supplier_logo: {
    type: String,
    required: true,
  },
  supplier_name: {
    type: String,
    required: true,
  },
  supplier_long: {
    type: String,
    default: "",
  },
  supplier_lat: {
    type: String,
    default: "",
  },
  supplier_phone: {
    type: Number,
    default: "",
  },
  created_at: { type: Date, default: Date.now() },
  __v: { type: Number, select: false },
});

SupplierSchema.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("suppliers", SupplierSchema);
