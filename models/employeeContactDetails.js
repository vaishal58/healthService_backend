const mongoose = require("mongoose");

const employeeContactDetailsSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },

  address: {
    type: String,
  },
  age: {
    type: Number,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  height: {
    type: Number,
  },
  bloodGroup: {
    type: String,
  },
  mentalStatus: {
    type: String,
  },
  dateOfJoin: {
    type: Date,
  },
  idMark: {
    type: String,
  },
  natureOfJob: {
    type: String,
  },

  // *
  // res: {
  //   type: String,
  // },
  mobileNumber: {
    type: Number,
  },
  office: {
    type: String,
  },

  pp: {
    type: String,
  },

  emer: {
    type: String,
  },

  email: {
    type: String,
  },
});

module.exports = mongoose.model(
  "EmployeeContactDetails",
  employeeContactDetailsSchema
);
