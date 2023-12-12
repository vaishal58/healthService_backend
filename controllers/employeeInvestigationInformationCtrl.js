
const EmployeeInvestigationInformation  = require("../models/employeeInvestigationInformation")

const CheckupData = require("../models/checkupData")

exports.addEmpInvestigationDetails = async (req, res) => {
    try {
        const data = req.body;

        console.log( data.data );

        const {checkupDataId} = data.data

        const newInvestigationInformation= new EmployeeInvestigationInformation(data.data);

        newInvestigationInformation
            .save()
            .then(() => {
                res.status(201).json({ data: newInvestigationInformation });
            })
            .catch((err) => {
                console.error("Error saving eye details:", err);
                res.status(500).json({ error: "Error saving investigation details", details: err });
            });
           
        const newid = newInvestigationInformation._id;    

              await CheckupData.findByIdAndUpdate( {_id :checkupDataId} , 
            
            { $set: { 'employeeReports.employeeInvestigationDetailsId': newid } },
         )    
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};