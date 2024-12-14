const mongoose = require("mongoose");

const schema = new mongoose.Schema({

  userName: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  resetCode: {
    type: String,
  },

  resetCodeExpiration: {
    type: Date,
  },
  
  refreshToken: String,
});

const model = mongoose.models.User || mongoose.model("User", schema);

module.exports = model;
