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
    isProductPopular,
    isProductNew,
    isActive
  } = req.body;

  
  const imageGalleryFiles = req.files; 

  if (!imageGalleryFiles || imageGalleryFiles.length === 0) {
    return res.status(400).send({
      success: false,
      error: "Main image and image gallery files are required.",
    });
  }
  const imageGallery = imageGalleryFiles.map((file) => file.filename);

  const productData = {
    name : name,
    description : description,
    category : category,
    subCategory : subCategory,
    subSubCategory : subSubCategory?subSubCategory:null,
    prices : {original : original, discounted : discounted},
    imageGallery : imageGallery,
    stock : {quantity : stock},
    sku : sku,
    isProductPopular : isProductPopular,
    isProductNew : isProductNew, 
    isActive:isActive
  };

  try {
    const newProduct = await Product.create(productData);
    res.send({
      success: true,
      newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error)
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
   return  res.send({ success: false, error: "Failed to fetch products." });
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
const updateProduct = async (req, res) => {
  console.log("colled")
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).send({ success: false, message: "Product ID is required." });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ success: false, message: "Product not found." });
    }
    const {
      name,
      description,
      category,
      subCategory,
      subSubCategory,
      original,
      discounted,
      imageGallery,
      stock,
      sku,
      isProductPopular,
      isProductNew,
      isActive
    } = req.body;

    
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        imageGallery.push(file.path);
      });
    }

  const productData = {
    name : name,
    description : description,
    category : category,
    subCategory : subCategory,
    subSubCategory : subSubCategory?subSubCategory:null,
    prices : {original : original, discounted : discounted},
    imageGallery : imageGallery,
    stock : {quantity : stock},
    sku : sku,
    isProductPopular : isProductPopular,
    isProductNew : isProductNew, 
    isActive:isActive
  };
    

    console.log(productData)
    await Product.findByIdAndUpdate(productId, productData);

    return res.send({
      success: true,
      message: "Product updated successfully.",
    });
  } catch (error) {
    console.error('Update Error:', error);
    res.send({ success: false, error: "Internal Server Error" });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
    const productId = req.params.id;
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
  addProduct,
};
