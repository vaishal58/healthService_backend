
const EmployeeForm33 = require("../models/employeeForm33")

const CheckupData = require("../models/checkupData")


exports.addEmpForm33 = async (req, res) => {
    try {
        const data = req.body;

        const {checkupDataId} = req.body

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

        await CheckupData.findByIdAndUpdate( {_id :checkupDataId} , 
            
            { $set: { 'employeeReports.employeeForm33Id': newid } },
         )     
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};