const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  
  {
    timestamps: true,
  }
);

const model = mongoose.models.Setting || mongoose.model("Setting", schema);

module.exports = model;
