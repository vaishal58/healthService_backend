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
    generalExam:{
        type:String
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
        type: String,
    },
    skinAndGenitals:
    {
        type: String,
    },
    ent:{
        type:String
    },
    other:{
        type:String
    },
    
   
    //other changes remaining
});


module.exports = mongoose.model("EmployeeGeneralExamination", employeeGeneralExaminationschema);