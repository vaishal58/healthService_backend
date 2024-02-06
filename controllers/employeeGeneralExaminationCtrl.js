const EmployeeGeneralExamination = require("../models/employeeGeneralExamination");
const CheckupData = require("../models/checkupData");

exports.editExamination = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const {
      companyId,
      employeeId,
      checkupNameId,
      checkupTypeId,
      checkupDataId,
      generalExam,
      rs,
      cvs,
      abdomenAS,
      cns,
      musculoSkeletal,
      skinAndGenitals,
      ent,
      other,
    } = req.body.data;

    const updatedEmployeeRole =
      await EmployeeGeneralExamination.findByIdAndUpdate(
        id,
        {
          companyId,
          employeeId,
          checkupNameId,
          checkupTypeId,
          checkupDataId,
          generalExam,
          rs,
          cvs,
          abdomenAS,
          cns,
          musculoSkeletal,
          skinAndGenitals,
          ent,
          other,
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

exports.addEmpGeneralExamination = async (req, res) => {
  try {
    const data = req.body;

    console.log(data.data);

    const { checkupDataId } = data.data;

    const newGeneralExamination = new EmployeeGeneralExamination(data.data);

    newGeneralExamination
      .save()
      .then(() => {
        res.status(201).json({ data: newGeneralExamination });
      })
      .catch((err) => {
        console.error("Error saving eye details:", err);
        res
          .status(500)
          .json({ error: "Error saving investigation details", details: err });
      });

    const newid = newGeneralExamination._id;

    await CheckupData.findByIdAndUpdate(
      { _id: checkupDataId },

      { $set: { "employeeReports.employeeGenerelExaminationId": newid } }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getspecificexamination = async (req, res) => {
  try {
    const id = req.params.id;
    const employeegeneral = await EmployeeGeneralExamination.findById(id);

    if (!employeegeneral) {
      return res.status(404).json({ error: "group not found" });
    }

    return res.json({ success: true, data: employeegeneral });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
