const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model("roles", RoleSchema);
