const mongoose = require("mongoose");

const employeeForm32Schema = new mongoose.Schema({

  
    companyId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Company"
    },

    employeeId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },

    checkupNameId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CheckupName"
    },

    checkupTypeId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CheckupType"
    },

    checkupDataId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CheckupData"
    },

    permanatOrTemporary : {
        type: String,
    },

    periodOfTemporaryUnfit:{
        type: String,
    },
 
    natureOfTests: {
        type: String
    },

    exposureTo: {
        type: String,
    },

    department:{
        type:String
    },

    dateOFPosting: {
        type: Date,
    },

    dateOfLeaving:
    {
        type: Date,
    },

    reasons:{
        type:String
    },

    signs:{
        type:String
    },
 
    dateOfDeclaringUnfit:{
        type:Date
    },

    dateOfissuingFitness : {
        type:Date
        
    }   
    //other changes remaining
});


module.exports = mongoose.model("EmployeeForm32", employeeForm32Schema);