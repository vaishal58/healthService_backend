const express = require("express");
const cookieParser = require("cookie-parser");
const { createCategory, getCategoryById, updateCategoryById, deleteCategoryById, getAllCategories } = require("../controllers/productCatController");

const router = express.Router();

router.use(cookieParser());

router.post("/addcategory" , createCategory);
router.post("/getcategories" , getAllCategories);
router.post("/getspecificcategory/:id" , getCategoryById);
router.post("/updatecategory/:id" , updateCategoryById);
router.post("/deletecategory/:id" ,  deleteCategoryById);


module.exports = router;