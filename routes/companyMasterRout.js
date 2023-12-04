const express = require('express');
const {addCompany ,addCompanyCategory ,getAllCompany,addCompanyDepartments ,addCompanyLocation ,getComapnyById,getAllEmployByCompany,getAllEmployByCompanyAndLocation} = require("../controllers/companyMasterCtrl");
const router = express.Router();

router.post( "/add-company",addCompany);
router.post("/add-company-category",addCompanyCategory)
router.post("/add-company-department",addCompanyDepartments)
router.post("/add-company-location" ,addCompanyLocation)
router.get("/get-companys",getAllCompany)
router.get("/get-company-by-id/:id",getComapnyById)
router.get("/get-all-emp-by-company/:id",getAllEmployByCompany)
router.post("/get-all-emp-by-company-location/:id" , getAllEmployByCompanyAndLocation)

module.exports = router;