const express = require("express");
const Category = require("../models/ProductCat");

// Create a new category
const createCategory = async (req, res) => {
  const { name, subCategories } = req.body;
  console.log(req.body);
  try {
    // Check if the category already exists
    let category = await Category.findOne({ name });

    if (category) {
      // Category exists, add the new subCategories
      category.subCategories.push(...subCategories);
      await category.save();
      return res.send({ success: true, msg: "Subcategories added to existing category", category });
    } else {
      // Create a new category document with subCategories
      const newCategory = await Category.create({ name, subCategories });
      return res.send({ success: true, msg: "Successfully Added", category: newCategory });
    }
  } catch (error) {
    return res.send({
      success: false,
      msg: "Error Occurred",
      error: error.message,
    });
  }
};


// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    res.send({ success: true, categories });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

// Get Specific subCategories
const getSpecificSubCategories = async (req, res) => {
  const { categoryId } = req.params; // Use req.params.categoryId instead of req.body.categoryId
  console.log(req.params);

  try {
    const category = await Category.findById(categoryId).exec();

    if (!category) {
      return res.send({ success: false, error: "Category not found" });
    }

    // Extract and send the subCategories from the found category
    const subCategories = category.subCategories;
    res.send({ success: true, subCategories });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getSpecificSubCategories,
};
