
const EmployeeBloodInformation = require("../models/employeeBloodInvestigationInformation")
const CheckupData = require("../models/checkupData")

exports.addEmpBloodInformation = async (req, res) => {
    try {
        const data = req.body;
        
        const {checkupDataId} = req.body

        const newBloodInformation = new EmployeeBloodInformation(data);

        newBloodInformation
            .save()
            .then(() => {
                res.status(201).json({ message: "empy blood info added successfully" });
            })
            .catch((err) => {
                console.error("Error saving blood info :", err);
                res.status(500).json({ error: "Error saving blood info ", details: err });
            });
           
        const newid = newBloodInformation._id;    

        await CheckupData.findByIdAndUpdate( {_id :checkupDataId} , 
            
            { $set: { 'employeeReports.employeeBloodInvestigationDetailsId': newid } },
         )       
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};