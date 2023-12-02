const mongoose = require("mongoose");

const checkDataSchema = new mongoose.Schema({
    checkupName: {
        type: String,
    },

    checkupType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
    checkupDate: {
        type: String,
    },
    companyId: {

    },
    employeeId: {

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
    employeeBloodInvestigationDetailsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmployeeBloodInformation"
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
    },

    employeeGenerelExaminationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmployeeGeneralExamination"
    },

    //other changes remaining
});


module.exports = mongoose.model("CheckData", checkDataSchema);