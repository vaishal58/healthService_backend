
const EmployeeForm33 = require("../models/employeeForm33")
const Employee = require("../models/employeeMaster")

exports.addEmpForm33 = async (req, res) => {
    try {
        const data = req.body;
        const {employeeId} = req.body

        const newForm33= new EmployeeForm33(data);

        newForm33
            .save()
            .then(() => {
                res.status(201).json({ message: "empy form33 added successfully" });
            })
            .catch((err) => {
                console.error("Error saving eye details:", err);
                res.status(500).json({ error: "Error saving  form33  details", details: err });
            });
           
        const newid = newForm33._id;    

        await Employee.findByIdAndUpdate( {_id :employeeId} , {
            employeeForm33Id :newid 
                
        } )    
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};