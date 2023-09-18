const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSpecificProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const upload = require("../middlewares/multerMiddleware");
const router = express.Router();

// Routes
router.post("/addproduct", upload.single("mainImage"), createProduct);
router.post("/getallproducts", getAllProducts);
router.post("/getspecificproduct", getSpecificProduct);
router.post(
  "/updateproduct",
  upload.single([
    "mainImage", // Allow only one main image file
  ]),
  updateProduct
);
router.post("/deleteproduct", deleteProduct);

module.exports = router;
