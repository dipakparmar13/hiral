const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Products = new Schema({
  category_id: {
    type: Number,
    ref: "categories",
    required: true,
  },
  user_id: {
    type: String,
    ref: "users",
    required: true,
  },
  product_id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  discript: {
    type: String,
    require: true,
  },
  qty: {
    type: Number,
    require: true,
  },
  unit: {
    type: String,
    require: true,
  },
  created_date: {
    type: Date,
  },
  updated_date: {
    type: Date,
  },
  __v: { type: Number, select: false },
});

Products.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("products", Products);
