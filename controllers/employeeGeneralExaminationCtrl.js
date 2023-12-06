
const  EmployeeGeneralExamination = require("../models/employeeGeneralExamination")
const CheckupData = require("../models/checkupData")

exports.addEmpGeneralExamination = async (req, res) => {
    try {
        const data = req.body;

        const {checkupDataId} = req.body

        const newGeneralExamination = new EmployeeGeneralExamination(data);

        newGeneralExamination
            .save()
            .then(() => {
                res.status(201).json({ message: "empy general examination details added successfully" });
            })
            .catch((err) => {
                console.error("Error saving eye details:", err);
                res.status(500).json({ error: "Error saving investigation details", details: err });
            });
           
        const newid = newGeneralExamination._id;    

          await CheckupData.findByIdAndUpdate( {_id :checkupDataId} , 
            
            { $set: { 'employeeReports.employeeGenerelExaminationId': newid } },
         )  
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};