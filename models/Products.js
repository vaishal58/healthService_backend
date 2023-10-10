const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
  subSubCategory: {
    type: mongoose.Schema.Types.Mixed,
    ref: "SubSubCategory",
    default: null,
  },
  tags : {type : Array },
  prices: {
    original: { type: Number },
    discounted: { type: Number },
  },
  imageGallery: { type: Array },
  stock: {
    quantity: { type: Number },
  },
  material: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
  color: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Season",
  },
  gst: { type: mongoose.Schema.Types.ObjectId, ref: "tax_and_gst" },
  sku: { type: String, unique: true },
  calculationOnWeight: { type: Boolean, default: false },
  weightType: { type: mongoose.Schema.Types.Mixed ,default: null, ref: "PriceUpdate" },
  weight: { type: Number },
  laborCost: { type: Number },
  discountOnLaborCost: { type: Number },
  isActive: { type: Boolean, default: true },
  isProductPopular: { type: Boolean, default: true },
  isProductNew: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  filters : {type: Array},
  color: { type: String },
  material: { type: String },
  season: { type: String },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
