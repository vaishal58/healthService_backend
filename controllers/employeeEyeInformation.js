
const EmployeeEyeInformation = require("../models/employeeEyeInformation")
const Employee = require("../models/employeeMaster")

exports.addEmpEyeInformation = async (req, res) => {
    try {
        const data = req.body;
        const {employeeId} = req.body

        const newEyeInformation= new EmployeeEyeInformation(data);

        newEyeInformation
            .save()
            .then(() => {
                res.status(201).json({ message: "empy eye details added successfully" });
            })
            .catch((err) => {
                console.error("Error saving eye details:", err);
                res.status(500).json({ error: "Error saving eye details", details: err });
            });
           
        const newid = newEyeInformation._id;    

        await Employee.findByIdAndUpdate( {_id :employeeId} , {
            employeeEyeDetailsId :newid 
                
        } )    
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};