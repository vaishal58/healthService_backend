const express = require("express");
const {
  addEmploy,
  getEmployById,
} = require("../controllers/employeeMasterCtrl");
const {
  addEmpContactDetails,
  getEmpContactDetailsId,
} = require("../controllers/employeeContactDetailsCtrl");
const {
  addEmpEyeInformation,
} = require("../controllers/employeeEyeInformation");
const {
  addEmpInvestigationDetails, getspecificotherinvestigation, editOther,
} = require("../controllers/employeeInvestigationInformationCtrl");
const {
  addVitalAndHistory,
  getspecificvitalsandhistory,
  editVital,
} = require("../controllers/employeeVitalAndhistoryCtrl");
const { addEmpForm32 } = require("../controllers/employeeForm32Ctrl");
const { addEmpForm33 } = require("../controllers/employeeForm33Ctrl");
const {
  addEmpBloodInformation,
} = require("../controllers/employeeBloodInvestigationInformationCtrl");
const {
  addEmpGeneralExamination, getspecificexamination,editExamination
} = require("../controllers/employeeGeneralExaminationCtrl");
const router = express.Router();

router.post("/add-employ", addEmploy);
router.post("/get-emp-by-id/:id", getEmployById);
router.post("/set-employ-contact-details", addEmpContactDetails);
router.post("/set-employ-eye-details", addEmpEyeInformation);
router.post("/set-employ-investigation-details", addEmpInvestigationDetails);
router.post("/set-employ-vital-and-history-details", addVitalAndHistory);
router.post("/set-employ-form-32-details", addEmpForm32);
router.post("/set-employ-form-33-details", addEmpForm33);
router.post("/set-employ-blood-information", addEmpBloodInformation);
router.post("/set-employ-general-examination", addEmpGeneralExamination);
router.post("/get-employ-contactetails-by-id", getEmpContactDetailsId);
router.get("/get-specificvital/:id", getspecificvitalsandhistory);
router.post("/edit-vital/:id", editVital);
router.post("/edit-examination/:id",editExamination)
router.post("/edit-other/:id",editOther)
router.get("/get-specificgeneral/:id", getspecificexamination);
router.get("/get-specificotherinvsetigation/:id", getspecificotherinvestigation);
// investigation

module.exports = router;
