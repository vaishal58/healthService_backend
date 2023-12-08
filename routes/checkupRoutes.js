const express = require('express');
const { addCheckupType , getCheckupType } = require("../controllers/checkupTypeCtrl");
const { addCheckupName } =  require( "../controllers/checkupMasterCtrl" );
const {addCheckupData} = require("../controllers/checkupData")
const router = express.Router();

router.post("/add-checkup-type",addCheckupType);
router.post("/add-checkup-name",addCheckupName)
router.post("/add-checkup-data",addCheckupData)
router.get("/get-all-checkup-type",getCheckupType)


module.exports = router;