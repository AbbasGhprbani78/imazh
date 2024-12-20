// const mongoose = require("mongoose");
// require("./Customer");
// require("./Operation");
// require("./Setting");

// const schema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer",
//       required: true,
//     },
//     operation: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Operation",
//       required: true,
//     },
//     operationSetting: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Setting",
//       required: true,
//     },
//     status: {
//       type: Number,
//       enum: [0, 1, 2],
//       required: true,
//     },

//     date1: {
//       type: Date,
//       required: true,
//     },

//     date2: {
//       type: Date,
//       required: true,
//     },
//     photos1: [
//       {
//         photoUrl: { type: String, required: true },
//       },
//     ],
//     photos2: [
//       {
//         photoUrl: { type: String, required: true },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// const model = mongoose.models.Archive || mongoose.model("Archive", schema);

// module.exports = model;

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../configs/db");

// const Archive = sequelize.define(
//   "Archive",
//   {
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "Customer",
//         key: "id",
//       },
//     },
//     operationId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "Operation",
//         key: "id",
//       },
//     },
//     settingId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "Setting", 
//         key: "id",
//       },
//     },
//     status: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         isIn: [[0, 1, 2]],
//       },
//     },
//     date1: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     date2: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     photos1: {
//       type: DataTypes.JSON,
//       allowNull: false,
//       validate: {
//         isArray: true, 
//       },
//     },
//     photos2: {
//       type: DataTypes.JSON,
//       allowNull: false,
//       validate: {
//         isArray: true,
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = Archive;
