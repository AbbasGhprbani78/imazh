const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
});

const model = mongoose.models.Color || mongoose.model("Color", schema);

module.exports = model;
