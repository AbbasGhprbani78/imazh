// const mongoose = require("mongoose");
// require("./Color");

// const schema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     role: {
//       type: String,
//       required: true,
//       enum: ["d", "s", "a"],
//     },

//     resetCode: {
//       type: String,
//     },

//     resetCodeExpiration: {
//       type: Date,
//     },
//     img: {
//       type: String,
//     },
//     themecolor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Color",
//     },

//     refreshToken: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// const model = mongoose.models.User || mongoose.model("User", schema);

// module.exports = model;

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../configs/db");
// const User = sequelize.define(
//   "User",
//   {
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     role: {
//       type: DataTypes.ENUM("d", "s", "a"),
//       allowNull: false,
//     },
//     resetCode: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     resetCodeExpiration: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     img: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     themecolor: {
//       type: DataTypes.INTEGER,
//       allowNull:true,
//       references: {
//         model: "Color",
//         key: "id",
//       },
//     },
//     refreshToken: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );


// module.exports = User;
