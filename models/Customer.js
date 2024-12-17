const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },

    nationalcode: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
      unique: true,
    },
    datereference: {
      type: Date,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    filenumber: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["men", "women"],
      default: "men",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Customer || mongoose.model("Customer", schema);

module.exports = model;
