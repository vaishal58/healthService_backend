const EmployeeForm33 = require("../models/employeeForm33");

const CheckupData = require("../models/checkupData");
exports.editForm33 = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const {
      companyId,
      employeeId,
      checkupNameId,
      checkupTypeId,
      checkupDataId,
      employyedOrPrpposed,
      hazardousProcess,
      dnagerousOperation,
      fitOrUnfit,
      unfitReason,
      referedTo,
    } = req.body.data;

    const updatedEmployeeRole =
      await EmployeeForm33.findByIdAndUpdate(
        id,
        {
          companyId,
          employeeId,
          checkupNameId,
          checkupTypeId,
          checkupDataId,
          employyedOrPrpposed,
          hazardousProcess,
          dnagerousOperation,
          fitOrUnfit,
          unfitReason,
          referedTo,
        },
        { new: true }
      );

    if (!updatedEmployeeRole) {
      return res.status(404).json({ error: "Type not found" });
    }

    return res.json({ success: true, data: updatedEmployeeRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addEmpForm33 = async (req, res) => {
  try {
    const data = req.body;

    const { checkupDataId } = data.data;

    const newForm33 = new EmployeeForm33(data.data);

    newForm33
      .save()
      .then(() => {
        res.status(201).json({ data: newForm33 });
      })
      .catch((err) => {
        console.error("Error saving eye details:", err);
        res
          .status(500)
          .json({ error: "Error saving  form33  details", details: err });
      });

    const newid = newForm33._id;

    await CheckupData.findByIdAndUpdate(
      { _id: checkupDataId },

      { $set: { "employeeReports.employeeForm33Id": newid } }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getspecificform33 = async (req, res) => {
  try {
    const id = req.params.id;
    const employeeform33 = await EmployeeForm33.findById(id);

    if (!employeeform33) {
      return res.status(404).json({ error: "group not found" });
    }

    return res.json({ success: true, data: employeeform33 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
