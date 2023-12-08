const mongoose = require("mongoose");

const employeeGeneralExaminationschema = new mongoose.Schema({

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

    rs: {
        type: String,
       
    },
    cvs: {
        type: String,
    },
    abdomenAS: {
        type: String
    },
    cns: {
        type: String,
    },
    musculoSkeletal: {
        type: Date,
    },
    skinAndGenitals:
    {
        type: Date,
    },
    ent:{
        type:String
    },
    other:{
        type:Date
    },
    
   
    //other changes remaining
});


module.exports = mongoose.model("EmployeeGeneralExamination", employeeGeneralExaminationschema);