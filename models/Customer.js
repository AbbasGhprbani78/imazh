// const mongoose = require("mongoose");
// const schema = new mongoose.Schema(
//   {
//     fullname: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     phonenumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     nationalcode: {
//       type: String,
//       required: true,
//       match: /^[0-9]{10}$/,
//       unique: true,
//     },
//     datereference: {
//       type: Date,
//       required: true,
//     },
//     birthday: {
//       type: Date,
//       required: true,
//     },
//     filenumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     gender: {
//       type: String,
//       required: true,
//       enum: ["men", "women"],
//       default: "men",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const model = mongoose.models.Customer || mongoose.model("Customer", schema);

// module.exports = model;

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../configs/db");


// const Customer = sequelize.define(
//   "Customer",
//   {
//     fullname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     phonenumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         is: /^[0-9]{10,15}$/,
//       },
//     },
//     nationalcode: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         is: /^[0-9]{10}$/,
//       },
//     },
//     datereference: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     birthday: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       validate: {
//         isDate: true,
//         isBefore: new Date().toISOString(), 
//       },
//     },
//     filenumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     gender: {
//       type: DataTypes.ENUM("men", "women"),
//       allowNull: false,
//       defaultValue: "men",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = Customer;

