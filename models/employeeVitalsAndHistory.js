const mongoose = require("mongoose");

const employeeVitalsAndHistorySchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },

    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    height: {
        type: Number,

    },
    weight: {
        type: Number,
    },
    bmi: {
        type: String
    },
    pulse: {
        type: String,
    },
    bp: {
        type: Number,
    },
    temperature:
    {
        type: String,
    },
    complaints:
    {
        type: String,
    },
    pastHistory:
    {
        type: Date,
    },
    personalHistory:
    {
        type: String,
    },
    familyHistory:
    {
        type: String,
    },

    allergyIfAny: {
        type: String,
    }
    
});


module.exports = mongoose.model("EmployeeVitalsAndHistory", employeeVitalsAndHistorySchema);