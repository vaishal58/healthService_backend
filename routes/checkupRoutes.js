const express = require('express');
const { addCheckupType } = require("../controllers/checkupTypeCtrl");
const { addCheckupName } =  require( "../controllers/checkupMasterCtrl" );
const {addCheckupData} = require("../controllers/checkupData")
const router = express.Router();

router.post("/add-checkup-type",addCheckupType);
router.post("/add-checkup-name",addCheckupName)
router.post("/add-checkup-data",addCheckupData)


module.exports = router;