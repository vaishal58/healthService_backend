const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const multer = require("multer");
const { addProduct, getAllProducts, getSpecificProduct, updateProduct, deleteProduct } = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products/");
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const extension = originalFileName.split(".").pop();
    const newFileName = `${Date.now()}_productimage.${extension}`;
    cb(null, newFileName);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."));
  }
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

router.post("/addproduct", upload.array("imageGallery", 10), addProduct);
router.post("/getallproducts", getAllProducts);
router.post("/getspecificproduct/:id", getSpecificProduct);
router.post("/updateproduct/:id", updateProduct);
router.post("/deleteproduct/:id", deleteProduct);



module.exports = router;
