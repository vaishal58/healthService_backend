const express = require("express");
const cookieParser = require("cookie-parser");
const { registerCustomer, loginCustomer, getCustomers, getLoggedInCustomer, logoutCustomer, getSpecificCustomer, loginStatus, updateCustomerPassword, forgotCustomerPassword, resetCustomerPassword, updateCustomer, DeleteCustomer } = require("../controllers/customerController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(cookieParser());

router.post("/register" , registerCustomer);
router.post("/login" , loginCustomer);
router.post("/logout" , logoutCustomer);
router.post("/getcustomers" , getCustomers);
router.post("/getloggedincustomer" , protect ,getLoggedInCustomer);
router.post("/getspecificcustomer/:id" , getSpecificCustomer);
router.post("/getloginstatus" , loginStatus);
router.post("/updatecustomer" , updateCustomer);
router.post("/updatecustomerpassword/:id" ,updateCustomerPassword);
router.post("/forgetpassword" ,forgotCustomerPassword);
router.post("/resetpassword/:resetToken" , resetCustomerPassword);
router.post("/deletecustomer" , DeleteCustomer);


module.exports = router;