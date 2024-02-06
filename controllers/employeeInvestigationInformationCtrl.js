const EmployeeInvestigationInformation = require("../models/employeeInvestigationInformation");

const CheckupData = require("../models/checkupData");
exports.editOther = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const {
      companyId,
      employeeId,
      checkupNameId,
      checkupTypeId,
      checkupDataId,
      labReports,
      xRayReport,
      ecgReport,
      spirometry,
      audiometry,
      remarks,
    } = req.body.data;

    const updatedEmployeeRole =
      await EmployeeInvestigationInformation.findByIdAndUpdate(
        id,
        {
          companyId,
          employeeId,
          checkupNameId,
          checkupTypeId,
          checkupDataId,
          labReports,
          xRayReport,
          ecgReport,
          spirometry,
          audiometry,
          remarks,
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
exports.addEmpInvestigationDetails = async (req, res) => {
  try {
    const data = req.body;

    console.log(data.data);

    const { checkupDataId } = data.data;

    const newInvestigationInformation = new EmployeeInvestigationInformation(
      data.data
    );

    newInvestigationInformation
      .save()
      .then(() => {
        res.status(201).json({ data: newInvestigationInformation });
      })
      .catch((err) => {
        console.error("Error saving eye details:", err);
        res
          .status(500)
          .json({ error: "Error saving investigation details", details: err });
      });

    const newid = newInvestigationInformation._id;

    await CheckupData.findByIdAndUpdate(
      { _id: checkupDataId },

      { $set: { "employeeReports.employeeInvestigationDetailsId": newid } }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getspecificotherinvestigation = async (req, res) => {
  try {
    const id = req.params.id;
    const employeevital = await EmployeeInvestigationInformation.findById(id);

    if (!employeevital) {
      return res.status(404).json({ error: "group not found" });
    }

    return res.json({ success: true, data: employeevital });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
