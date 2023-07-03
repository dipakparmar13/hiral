const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  _id: {
    type: Number,
    require: true,
  },

  name: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model("categories", CategorySchema);
