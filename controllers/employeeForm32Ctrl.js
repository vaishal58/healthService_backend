
const EmployeeForm32 = require("../models/employeeForm32")
const Employee = require("../models/employeeMaster")

exports.addEmpForm32 = async (req, res) => {
    try {
        const data = req.body;
        const { employeeId } = req.body

        const newForm32 = new EmployeeForm32(data);

        newForm32
            .save()
            .then(() => {
                res.status(201).json({ message: "empy form32 added successfully" });
            })
            .catch((err) => {
                console.error("Error saving eye details:", err);
                res.status(500).json({ error: "Error saving  form32  details", details: err });
            });

        const newid = newForm32._id;

        await Employee.findByIdAndUpdate({ _id: employeeId }, {
            employeeForm32Id: newid

        })
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};