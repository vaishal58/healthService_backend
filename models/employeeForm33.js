const mongoose = require("mongoose");

const employeeForm33Schema = new mongoose.Schema({

    companyId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Company"
    },

    employeeId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },

    employyedOrPrpposed: {
        type: String,
       
    },
    hazardousProcess: {
        type: String,
    },
    dnagerousOperation: {
        type: String
    },
    fitOrUnfit: {
        type: Boolean,
    },
    unfitReason: {
        type: String,
    },
    referedTo:
    {
        type: String,
    },
   
    //other changes remaining
});


module.exports = mongoose.model("EmployeeForm33", employeeForm33Schema);