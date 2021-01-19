var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var Schema = mongoose.Schema;

var eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", eventSchema);
