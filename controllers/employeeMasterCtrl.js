const Employee = require("../models/employeeMaster")
const Company  = require("../models/companyMaster") 
const { ObjectId } = require('mongodb');
exports.addEmploy = async (req, res) => {
  try {
    const data = req.body;

    const newEmoloy = new Employee(data);

    newEmoloy
      .save()
      .then(() => {
        res.status(201).json({ message: "employ added successfully" });
      })
      .catch((err) => {
        console.error("Error saving employ:", err);
        res.status(500).json({ error: "Error saving emp", details: err });
      });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEmployById = async (req, res) => {

  try {

    const id = req.params.id

    const _id = new ObjectId(id);

    const data = await Employee.findById(_id).populate("employeeContactDetailsId").then((data) => {
      res.status(200).json({
        data: data
      })
    }).catch(() => {
      res.status(501).json({
        message: "internal server error"
      })
    });

  } catch (error) {
    res.status(501).json({
      message: "internal server error"
    })
  }

}