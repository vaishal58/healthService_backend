const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { getAllStock, createStock, getStockById, updateStockById, deleteStockById } = require("../controllers/StockController");


router.use(cookieParser());


router.post("/getstocks", getAllStock);
router.post("/createstock", createStock);
// router.post("/getspecificstock/:id", getStockById);
router.post("/updatestock/:id", updateStockById);
router.post("/deletecontent/:id", deleteStockById);


module.exports = router;
