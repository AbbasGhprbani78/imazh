const mongoose = require("mongoose");
require("./Customer");
require("./Operation");
require("./Setting");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    operation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operation",
      required: true,
    },
    operationSetting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Setting",
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1, 2],
      required: true,
    },
    
    date1: {
      type: Date,
      required: true,
    },

    date2: {
      type: Date,
      required: true,
    },
    photos1: [
      {
        photoUrl: { type: String, required: true },
      },
    ],
    photos2: [
      {
        photoUrl: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Archive || mongoose.model("Archive", schema);

module.exports = model;
