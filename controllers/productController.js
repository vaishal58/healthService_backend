const express = require("express");
const Product = require("../models/Products");
const Category = require("../models/ProductCat");

// Create Product

exports.addProduct = async (req, res, next) => {
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
    status,
    isProductPopular,
    isProductNew,
  } = req.body;

  // Extract the main image and image gallery files
  const mainImageFile = req.file;
  const imageGalleryFiles = req.files; // Assuming you use multipart form data for multiple files

  // Check if main image and image gallery files exist
  if (!mainImageFile || !imageGalleryFiles || imageGalleryFiles.length === 0) {
    return res.status(400).send({
      success: false,
      error: "Main image and image gallery files are required.",
    });
  }

  // Prepare main image and image gallery URLs
  const mainImageURL = mainImageFile.filename; // Assuming you're saving the main image
  const imageGallery = imageGalleryFiles.map((file) => file.filename);

  const productData = {
    name : name,
    description : description,
    category : category,
    subCategory : subCategory,
    subSubCategory : subSubCategory,
    prices : {original : original , discounted : discounted},
    mainImageURL : mainImageURL,
    imageGallery : imageGallery,
    stock : stock,
    sku : sku,
    status : status,
    isProductPopular : isProductPopular,
    isProductNew : isProductNew , 
  };

  try {
    const newProduct = await Product.create(productData);
    res.send({
      success: true,
      data: newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (e.g., duplicate SKU)
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
   return  res.send({ success: false, error: "Failed to fetch products." });
  }
};

// Get Specific Product
const getSpecificProduct = async (req, res) => {
  const productId = req.body.id;
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
const updateProduct = async (req, res) => {
  try {
    if (req.body.id) {
      const { id, name, description, category, subCategory, original ,discounted, stock, sku, status , isProductPopular , isProductNew} = req.body;
      const product = await Product.findById(id);
  
      if (!product) {
        return res.send({ success: false, message: "Product not found." });
      }
  
      // Assuming you have a mainImage property in your req.file
      const mainImage = req.file ? req.file.path : product.mainImageURL;

      await Product.findByIdAndUpdate(id, {
        name: name,
        description: description,
        category: category,
        subCategory: subCategory,
        prices : {original : original, discounted : discounted},
        stock : stock,
        sku : sku,
        mainImageURL : mainImage,
        status : status,
        isProductPopular : isProductPopular, 
        isProductNew : isProductNew,
      });
      return res.send({
        success: true,
        msg: "Product updated",
      });
    }
  } catch (error) {
    console.error('Update Error:', error);
    res.send({ success: false ,  error: error });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
    const productId = req.body.id;
    try {
      const deletedProduct = await Product.findByIdAndRemove(productId);
      if (!deletedProduct) {
        return res.send({success : false  , message: "Product not found."});
      }
       return res.send({ success : true, message: "Product deleted successfully." });
    } catch (error) {
      return res.send({ success : false ,  error: "Failed to delete the product." });
    }
  };

module.exports = {
  getAllProducts,
  getSpecificProduct,
  updateProduct,
  deleteProduct,
};
