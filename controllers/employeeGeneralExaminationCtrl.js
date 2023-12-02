
const  EmployeeGeneralExamination = require("../models/employeeGeneralExamination")
const Employee = require("../models/employeeMaster")

exports.addEmpGeneralExamination = async (req, res) => {
    try {
        const data = req.body;
        const {employeeId} = req.body

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
           
        const newid = newInvestigationInformation._id;    

        await Employee.findByIdAndUpdate( {_id :employeeId} , {
            employeeGenerelExaminationId :newid 
                
        } )     
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};