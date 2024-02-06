const EmployeeVitalsAndHistory = require("../models/employeeVitalsAndHistory");

const CheckupData = require("../models/checkupData");

exports.editVital = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const {
      companyId,
      employeeId,
      checkupNameId,
      checkupTypeId,
      checkupDataId,
      height,
      weight,
      bmi,
      pulse,
      bp,
      temperature,
      complaints,
      pastHistory,
      personalHistory,
      familyHistory,
      allergyIfAny,
    } = req.body.data;

    const updatedEmployeeRole =
      await EmployeeVitalsAndHistory.findByIdAndUpdate(
        id,
        {
          companyId,
          employeeId,
          checkupNameId,
          checkupTypeId,
          checkupDataId,
          height,
          weight,
          bmi,
          pulse,
          bp,
          temperature,
          complaints,
          pastHistory,
          personalHistory,
          familyHistory,
          allergyIfAny,
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

exports.addVitalAndHistory = async (req, res) => {
  try {
    const data = req.body;

    console.log(data.data);

    const { checkupDataId } = data.data;

    const newVitalAndHistory = new EmployeeVitalsAndHistory(data.data);

    newVitalAndHistory
      .save()
      .then(() => {
        res.status(201).json({ data: newVitalAndHistory });
      })
      .catch((err) => {
        console.error("Error saving vital and histor", err);
        res
          .status(500)
          .json({ error: "Error saving vital and histor", details: err });
      });

    const newid = newVitalAndHistory._id;

    await CheckupData.findByIdAndUpdate(
      { _id: checkupDataId },

      { $set: { "employeeReports.employeeVitalAndHistoryId": newid } }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getspecificvitalsandhistory = async (req, res) => {
  try {
    const id = req.params.id;
    const employeevital = await EmployeeVitalsAndHistory.findById(id);

    if (!employeevital) {
      return res.status(404).json({ error: "group not found" });
    }

    return res.json({ success: true, data: employeevital });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
