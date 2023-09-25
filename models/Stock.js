// Import necessary modules
const mongoose = require("mongoose");

// Define the Stock schema
const stockSchema = new mongoose.Schema({
  ProductId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: { type:String },
  quantity: {
    type: String,
    required: true,
  },
  currentPricePerUnit: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    value: Date.now,
  },
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
