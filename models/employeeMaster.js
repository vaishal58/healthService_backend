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
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
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
   
  employeeCheckUpDetails : [{
   
    checkUpNameId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeContactDetails"
    },

    checkUpDataId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeContactDetails"
    }

  }]
  
});


module.exports = mongoose.model("Employee", employeeSchema);