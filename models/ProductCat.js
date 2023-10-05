const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String},
  image: { type: String},
  description: { type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  noOfProducts: {
    type: Number,
    default: 0,
  },
  
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
