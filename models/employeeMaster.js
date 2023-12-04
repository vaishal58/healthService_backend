const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  employeeNameAbbrevation: {
    type: String,

  },
  employeeFatherName: {
    type: String,
    default: null
  },
  companyName: {
    type: String,
  },
  companyLocation: {
    type: String,
  },
  companyJobCategorys: {
    type: String,
  },

  companyDepartments:
  {
    type: String,
  },

  employeeContactDetailsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployeeContactDetails"
  },
  employeeEyeDetailsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployeeEyeInformation"
  },

  employeeInvestigationDetailsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployeeInvestigationInformation"
  },

  employeeVitalAndHistoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployeeVitalsAndHistory"
  },
  employeeForm32Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployeeForm32"
  },
  employeeForm33Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployeeForm33"
  }
  //other changes remaining
});


module.exports = mongoose.model("Employee", employeeSchema);