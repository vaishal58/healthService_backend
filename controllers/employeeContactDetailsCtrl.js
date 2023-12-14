const EmployeeContactDetails = require("../models/employeeContactDetails");
const Employee = require("../models/employeeMaster");
const { ObjectId } = require("mongodb");

exports.addEmpContactDetails = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const { employeeId } = req.body;

    const empID = new ObjectId(employeeId);

    const newContactDetails = new EmployeeContactDetails(data);

    newContactDetails
      .save()
      .then(() => {
        res
          .status(201)
          .json({ message: "empy contact details added successfully" });
      })
      .catch((err) => {
        console.error("Error saving contact details:", err);
        res
          .status(500)
          .json({ error: "Error saving contact details", details: err });
      });

    const newid = newContactDetails._id;

    await Employee.findByIdAndUpdate(
      { _id: empID },
      {
        employeeContactDetailsId: newid,
      }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEmpContactDetailsId = async (req, res) => {
  try {
    const id = req.body;

    console.log("--------id in backend-------", id);

    const _id = new ObjectId(id);

    const data = await EmployeeContactDetails.findById(_id);
    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update contact details

// exports.getEmpContactDetailsId = async (req, res) => {
//     try {
//         const  id = req.body;

//         const _id = new ObjectId(id);

//         await EmployeeContactDetails.findById( _id ).then( (data) =>{
//             res.status(201).json( { data : data } )
//         } ).catch( ( error )=>{
//             console.error("Internal server error:", error);
//         res.status(500).json({ error: "Internal server error" })

//         })

//     } catch (error) {
//         console.error("Internal server error:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// ak min hu joi lav scrol na karta
//try kari lo na thay ko okkkkkkk
//haa kariye
//done change su karyo e ke
