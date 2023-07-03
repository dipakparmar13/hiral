const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var InvitationSchema = new Schema({
  invited_by_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  invited_user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  organization_id: {
    type: Schema.Types.ObjectId,
    ref: "organization",
    required: true,
  },
  customer_account: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: Number,
    required: false,
    default: "",
  },
  email: {
    type: String,
    required: false,
    default: "",
  },
  organization_type: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    // required: true,
    default: 0,
  },
  invitation_code: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Number,
    default: 0,
  },
  created_at: { type: Date, default: Date.now() },
  __v: { type: Number, select: false },
});

InvitationSchema.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("invitation", InvitationSchema);
