const mongoose = require("mongoose");
require("./Color");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["d", "s", "a"],
    },

    resetCode: {
      type: String,
    },

    resetCodeExpiration: {
      type: Date,
    },
    img: {
      type: String,
    },
    themecolor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },

    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.User || mongoose.model("User", schema);

module.exports = model;
