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
    status,
    isProductPopular,
    isProductNew,
    isActive
  } = req.body;

  console.log(req.files)
  console.log(req.body)


  // Extract the main image and image gallery files
  // const mainImageFile = req.file;
  const imageGalleryFiles = req.files; // Assuming you use multipart form data for multiple files

  // Check if main image and image gallery files exist
  if (!imageGalleryFiles || imageGalleryFiles.length === 0) {
    return res.status(400).send({
      success: false,
      error: "Main image and image gallery files are required.",
    });
  }

  // Prepare main image and image gallery URLs
  // const mainImage = mainImageFile.filename; // Assuming you're saving the main image
  const imageGallery = imageGalleryFiles.map((file) => file.filename);

  const productData = {
    name : name,
    description : description,
    category : category,
    subCategory : subCategory,
    subSubCategory : subSubCategory,
    prices : {original : original , discounted : discounted},
    // mainImage : mainImage,
    imageGallery : imageGallery,
    stock : {quantity : stock},
    sku : sku,
    status : status,
    isProductPopular : isProductPopular,
    isProductNew : isProductNew , 
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
  try {
    const productId = req.params.id; // Get the product ID from the route parameter

    // Check if a valid product ID is provided
    if (!productId) {
      return res.status(400).send({ success: false, message: "Product ID is required." });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).send({ success: false, message: "Product not found." });
    }

    // Extract updated product information from the request body
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
      status,
      isProductPopular,
      isProductNew,
      isActive
    } = req.body;

    
    if (req.files && req.files.length > 0) {
      // Handle multiple image files for the gallery
      req.files.forEach((file) => {
        imageGallery.push(file.path);
      });
    }

    // Update the product with the new information, except for the mainImageURL
    await Product.findByIdAndUpdate(productId, {
      name,
      description,
      category,
      subCategory,
      subSubCategory,
      prices: { original, discounted },
      imageGallery, // Update the image gallery field
      stock,
      sku,
      status,
      isProductPopular,
      isProductNew,
      isActive
    });

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
