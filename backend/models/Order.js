const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  buyer_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  buyer_paid_fees: { type: Number, default: 0 },
  // user_name: { type: String, default: "" },
  supplier_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  // supplier_name: { type: String, default: "" },
  // supplier_phone: { type: String, default: "" },
  quantity: { type: Number, default: 0 },
  total_price: { type: Number, default: 0 },
  order_name: { type: String, default: "" },
  order_number: { type: Number, default: 0 },
  additional_info: { type: String, default: "" },
  order_status: { type: String, default: "pending" },
  shipment_order: [
    {
      lat: { type: Number },
      long: { type: Number },
      address: { type: String },
      arrival_time: { type: Number },
      created_at: { type: Date, default: Date.now() },
      statusCode: { type: Number },
      order_id: { type: String },
      label: { type: String },
      value: { type: String },
      color: { type: String },
      bgcolor: { type: String },
    },
  ],
  product: [
    {
      product_id: { type: String },
      product_name: { type: String },
      product_price: { type: Number },
      product_quantity: { type: Number },
    },
  ],
  title: { type: String, default: "" },
  tags: { type: String, default: "" },
  is_favorite: {
    type: Boolean,
    default: false,
  },
  is_from_app: {
    type: Boolean,
    default: false,
  },
  order_at: { type: Date },
  deliver_at: { type: Date },
  arrival_time: { type: Number },
  created_at: { type: Date, default: Date.now() },
  message: { type: String, default: "" },
  device_token: { type: String, default: "" },
  __v: { type: Number, select: false },
});

OrderSchema.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("orders", OrderSchema);
