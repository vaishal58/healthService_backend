const express = require("express");
const cookieParser = require("cookie-parser");
const { createOrder, getOrders, updateOrder, getOrderById, deleteOrder } = require("../controllers/OrderController");

const router = express.Router();

router.use(cookieParser());

router.post("/addorder" , createOrder);
router.post("/getallorders" , getOrders);
router.post("/getspecificorder/:id" , getOrderById);
router.post("/updateorder/:id" , updateOrder);
router.post("/deleteorder/:id" ,  deleteOrder);

module.exports = router;