const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    operation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Operation || mongoose.model("Operation", schema);

module.exports = model;
