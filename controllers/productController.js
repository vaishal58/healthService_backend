const express = require("express");
const Product = require("../models/Products");
const Category = require("../models/ProductCat");

// Create Product
const createProduct =  async (req, res) => {
  try {
    const { name, description, category ,subCategory,original ,discounted, stock, sku , status ,isProductPopular, isProductNew } = req.body;
    const mainImage = req.file.path;
    console.log(req.body);
    // console.log(req.file);

    const product = await Product.create({
      name:name,
      description:description,
      category:category,
      subCategory:subCategory,
      prices:{original:original,discounted:discounted},
      mainImageURL: mainImage,
      // imageGallery:imageGallery,
      stock:stock,
      sku:sku,
      status : status,
      isProductPopular : isProductPopular , 
      isProductNew : isProductNew,
    });
    
    // Fetch the category name using the category ID
    const categoryObj = await Category.findById(category);

    // Get the category name from the fetched category object
    const categoryName = categoryObj.name;

    return res.send({success:true,msg:'product added successfully' , product , categoryName});
  } catch (error) {
    return res.send({ error:error.message });
  }
}

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
  createProduct,
  getAllProducts,
  getSpecificProduct,
  updateProduct,
  deleteProduct,
};
