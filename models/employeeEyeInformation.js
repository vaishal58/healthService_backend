const mongoose = require("mongoose");

const employeeEyeInformationSchema = new mongoose.Schema({

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

    distandVisionRightEye: {
        type: Number,
    },

    distandVisionLeftEye: {
        type: Number,
    },

    nearVisionRightEye: {
        type: Number,
    },

    nearVisionLeftEye: {
        type: Number,
    },

    colourVision:
    {
        type: String,
    },

    remark : {
        type:String
    }



});


module.exports = mongoose.model("EmployeeEyeInformation", employeeEyeInformationSchema);