const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nameoperation: {
    type: String,
    required: true,
  },
});

const model = mongoose.models.Operation || mongoose.model("Operation", schema);

module.exports = model;
