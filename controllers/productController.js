const express = require("express");
const Product = require("../models/Products");
const Category = require("../models/ProductCat");

// Create Product

const addProduct = async (req, res, next) => {
  const {
    name,
    description,
    category,
    subCategory,
    subSubCategory,
    original,
    discounted,
    stock,
    sku,
    gst,
    isProductPopular,
    isProductNew,
    isActive,
  } = req.body;

  const imageGalleryFiles = req.files;

  if (!imageGalleryFiles || imageGalleryFiles.length === 0) {
    return res.status(400).send({
      success: false,
      error: "Main image and image gallery files are required.",
    });
  }
  const imageGallery = imageGalleryFiles.map((file) => file.filename);
  console.log(req.body);

  const productData = {
    name: name,
    description: description,
    category: category,
    subCategory: subCategory,
    subSubCategory: subSubCategory ? subSubCategory : null,
    prices: { original: original, discounted: discounted },
    imageGallery: imageGallery,
    stock: { quantity: stock },
    sku: sku,
    gst: gst,
    isProductPopular: isProductPopular,
    isProductNew: isProductNew,
    isActive: isActive,
  };

  try {
    const newProduct = await Product.create(productData);
    res.send({
      success: true,
      newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.send({ success: false, error: "Duplicate SKU" });
    } else {
      res.send({ success: false, error: "Internal Server Error" });
    }
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().exec();
    return res.send({ success: true, products });
  } catch (error) {
    return res.send({ success: false, error: "Failed to fetch products." });
  }
};

// Get Specific Product
const getSpecificProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.send({ success: false, message: "Product not found." });
    }
    return res.send({ success: true, product });
  } catch (error) {
    return res.send({ success: fale, error: "Failed to fetch the product." });
  }
};

// Update Product
// const updateProduct = async (req, res) => {
//   console.log("body of req",req.body);
//   try {
//     const productId = req.params.id;
//     if (!productId) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Product ID is required." });
//     }
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res
//         .status(404)
//         .send({ success: false, message: "Product not found." });
//     }
//     const {
//       name,
//       description,
//       category,
//       subCategory,
//       subSubCategory,
//       original,
//       discounted,
//       stock,
//       sku,
//       gst,
//       isProductPopular,
//       isProductNew,
//       isActive,
//     } = req.body;
  

//     if (req.files && req.files.length > 0) {
//       req.files.forEach((file) => {
//         imageGallery.push(file.path);
//       });
//     }

//     const productData = {
//       name: name,
//       description: description,
//       category: category,
//       subCategory: subCategory,
//       subSubCategory: subSubCategory ? subSubCategory : null,
//       prices: { original: original, discounted: discounted },
//       imageGallery: imageGallery,
//       stock: { quantity: stock },
//       sku: sku,
//       gst: gst,

//       isProductPopular: isProductPopular,
//       isProductNew: isProductNew,
//       isActive: isActive,
//     };

//     await Product.findByIdAndUpdate(productId, productData);

//     return res.send({
//       success: true,
//       message: "Product updated successfully.",
//     });
//   } catch (error) {
//     console.error("Update Error:", error);
//     res.send({ success: false, error: "Internal Server Error" });
//   }
// };

const updateProduct = async (req, res, next) => {
  try {
    const Id = req.params.id;
    const productToUpdate = await Product.findById(Id);

      console.log(req.body)
    if (!productToUpdate) {
      return res.send({ error: 'SubSubCategory not found' });
    }
         const productData = {
       name: req.body.name,
       description: req.body.description,
       category: req.body.category,
       subCategory: req.body.subCategory,
       subSubCategory: req.body.subSubCategory ? req.body.subSubCategory : null,
       prices: { original: req.body.original, discounted: req.body.discounted },
       imageGallery: req.body.imageGallery,
       stock: { quantity: req.body.stock },
       sku: req.body.sku,
       gst: req.body.gst,
       isProductPopular: req.body.isProductPopular,
       isProductNew: req.body.isProductNew,
       isActive: req.body.isActive,
     };

    await Product.findByIdAndUpdate(Id, productData);
    const UpdatedProduct = await Product.findById(Id);

    res.send({
      success: true,
      msg: 'SubSubCategory updated successfully',
      data: UpdatedProduct,
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndRemove(productId);
    if (!deletedProduct) {
      return res.send({ success: false, message: "Product not found." });
    }
    return res.send({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    return res.send({ success: false, error: "Failed to delete the product." });
  }
};

module.exports = {
  getAllProducts,
  getSpecificProduct,
  updateProduct,
  deleteProduct,
  addProduct,
};
