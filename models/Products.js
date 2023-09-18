const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subCategory: { type:String },
  prices: {
    original: { type: Number },
    discounted: { type: Number },
  },
  mainImageURL: { type: String }, // Store the main image URL here
  // imageGallery: [{type: String}], // Store an array of image URLs here
  stock: { type: String }, // Store the stock quantity here
  sku: { type: String , unique : true},
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  }, 
  isProductPopular: { type: Boolean, default: true }, 
  isProductNew: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
