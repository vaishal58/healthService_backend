const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { getColors, addColor } = require("../controllers/ColorController");

router.use(cookieParser());

router.post("/getcolors", getColors);
router.post("/createcolor", addColor);


module.exports = router;