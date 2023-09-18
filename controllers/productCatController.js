const Category = require('../models/ProductCat'); // Import the Category model

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
     return res.send({success : true , msg:"Category Added Succesfully" ,category});
  } catch (err) {
    return res.send({ error: err.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false });
    return res.send(categories);
  } catch (err) {
    return res.send({ error: 'Server error' });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    console.log(categoryId);
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.send({ error: 'Category not found' });
    } else {
      res.send({ success: true, category });
    }
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Update a category by ID
exports.updateCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const categoryToUpdate = await Category.findById(categoryId);

    if (!categoryToUpdate) {
        return res.send({ error: "Category not found" });
    }

    const updateData = {
      name: req.body.name, // Replace 'name' with the field you want to update
      // Add more fields as needed
    };

    await Category.findByIdAndUpdate(categoryId, updateData);
    const updatedCategory = await Category.findById(categoryId);

    res.send({
      success: true,
      msg: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Delete a category by ID
exports.deleteCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { isDeleted: true },
      { new: true }
    );

    if (!category) {
      return res.send({ success: false, error: 'Category not found' });
    }

    return res.send({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    return res.send({ success: false, error: 'Server error' });
  }
};

// GetDeleted Categories
exports.getAllDeletedCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: true });
    return res.send(categories);
  } catch (err) {
    return res.send({ error: 'Server error' });
  }
};
