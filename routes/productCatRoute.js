const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories, getSpecificSubCategories } = require("../controllers/productCatController");

// Routes
router.post("/addcategory" , createCategory);
router.post("/getcategories",getAllCategories);
router.post("/:categoryId/subcategories",getSpecificSubCategories);



module.exports = router;