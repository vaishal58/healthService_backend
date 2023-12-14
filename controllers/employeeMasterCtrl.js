const Employee = require("../models/employeeMaster")

const Company = require("../models/companyMaster")

const { ObjectId } = require('mongodb');

exports.addEmploy = async (req, res) => {
  try {
    const data = req.body;

    const { companyId } = req.body;  //companyEmployees

    const newEmoloy = new Employee(data);

    newEmoloy
      .save()
      .then((data) => {
          
          return data.companyId.toString();
      })
      .catch((err) => {
        console.error("Error saving employ:", err);
        res.status(500).json({ error: "Error saving emp", details: err });
      });

     const { _id } = newEmoloy; 

     try{
     
     await Company.findByIdAndUpdate( {_id :companyId },
      { $push: { companyEmployees: _id } },
       );
     }catch(error){
        res.status(401).json({
          message:"error when add emp to company"
        })
     }

     res.status(200).json({
      data:newEmoloy
     })

       

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