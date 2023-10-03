const express = require("express");
const cookieParser = require("cookie-parser");
const { addGst, getGst } = require("../controllers/gstController");

const router = express.Router();

router.use(cookieParser());

router.post("/addgst" , addGst);
router.post("/getgst" , getGst);
// router.post("/getsubspecificcategory/:id" , getSubCategoryById);
// router.post("/updatesubcategory/:id" , updateSubCategoryById);
// router.post("/deletesubcategory/:id" ,  deleteSubCategoryById);


module.exports = router;