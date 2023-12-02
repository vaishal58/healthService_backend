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