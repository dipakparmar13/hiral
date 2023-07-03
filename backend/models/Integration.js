const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var IntegrationSchema = new Schema({
  supplier_id: {
    type: String,
    required: true,
  },  
  store: [
    {
      store_key: {
        type: String,
        required: true,
      },
      platform_name: {
        type: String,
        required: true,
      },
    },
  ],
  supplier_stores: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  created_at: { type: Date, default: Date.now() },
  __v: { type: Number, select: false },
});

IntegrationSchema.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("integrations", IntegrationSchema);
