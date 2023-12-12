const express = require('express');
const {addEmploy,getEmployById} = require("../controllers/employeeMasterCtrl");

const router = express.Router();

router.get( "/get-company",addEmploy);




// investigation

module.exports = router;