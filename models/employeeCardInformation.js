const mongoose = require("mongoose");

// pending 

const employeeCardInformationSchema = new mongoose.Schema({
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
    drugAleogy: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    hb: {
        type: Number,
    },
    medicalProblem: {
        type: String
    },
    contangeousSkinDisease: {
        type: String,
    },
    vision: {
        type: Number,
    },
    colourBlindness:
    {
        type: String,
    },
    rbc:
    {
        type: Number,
    },
    totalCount:
    {
        type: Number,
    },
    esr:
    {
        type: Number,
    },
    diffCount:
    {
        type: Number,
    },

    // *
    bloodSugar:
    {
        type: String,
    },
    SCholesterol:
    {
        type: String,
    },
    SCreatinine:
    {
        type: String,
    },
    // *
    sgpt:
    {
        type: String,
    },

    urineAnalysis:
    {
        type: String,
    },

    tmt:
    {
        type: String,
    },

    //other changes remaining
});


module.exports = mongoose.model("EmployeeCardInformation", employeeCardInformationSchema);