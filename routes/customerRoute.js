const express = require("express");
const cookieParser = require("cookie-parser");
const { registerCustomer, loginCustomer, getCustomers, getLoggedInCustomer, logoutCustomer, getSpecificCustomer, loginStatus, updateCustomerPassword, forgotCustomerPassword, resetCustomerPassword } = require("../controllers/customerController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(cookieParser());

router.post("/register" , registerCustomer);
router.post("/login" , loginCustomer);
router.post("/logout" , logoutCustomer);
router.post("/getcustomers" , getCustomers);
router.post("/getloggedincustomer" , protect ,getLoggedInCustomer);
router.post("/getspecificcustomer" , getSpecificCustomer);
router.post("/getloginstatus" , loginStatus);
router.post("/updatecustomerpassword" ,updateCustomerPassword);
router.post("/forgetpassword" ,forgotCustomerPassword);
router.post("/resetpassword/:resetToken" , resetCustomerPassword);


module.exports = router;