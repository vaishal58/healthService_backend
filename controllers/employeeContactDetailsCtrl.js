
const EmployeeContactDetails = require("../models/employeeContactDetails")
const Employee = require("../models/employeeMaster")

exports.addEmpContactDetails = async (req, res) => {
    try {
        const data = req.body;
        const {employeeId} = req.body

        const newContactDetails = new EmployeeContactDetails(data);

        newContactDetails
            .save()
            .then(() => {
                res.status(201).json({ message: "empy contact details added successfully" });
            })
            .catch((err) => {
                console.error("Error saving contact details:", err);
                res.status(500).json({ error: "Error saving contact details", details: err });
            });
           
        const newid = newContactDetails._id;    

        await Employee.findByIdAndUpdate( {_id :employeeId} , {
            employeeContactDetailsId :newid 
                
        } )    
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};