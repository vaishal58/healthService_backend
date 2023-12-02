const mongoose = require("mongoose");

const employeeInvestigationInformationSchema = new mongoose.Schema({
    companyId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Company"
    },

    employeeId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },
    labReports: {
        type: String,
        
    },
    xRayReport: {
        type: String,
    },
    ecgReport: {
        type: String
    },
    spirometry: {
        type: String,
    },
    audiometry: {
        type: String,
    },
    remarks:
    {
        type: String,
    },
   
    //other changes remaining
});


module.exports = mongoose.model("EmployeeInvestigationInformation", employeeInvestigationInformationSchema);