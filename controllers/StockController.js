const Stock = require("../models/Stock");
const Product = require("../models/Products");

// Create a new stock entry
exports.createStock = async (req, res, next) => {
  try {
    const { ProductId, quantity, currentPricePerUnit } = req.body;

    const product = await Product.findById(ProductId);

    const newStock = new Stock({
      ProductId,
      quantity,
      currentPricePerUnit,
      name: product.name,
    });

    await newStock.save();

    res.status(201).json({
      success: true,
      message: "Stock entry created successfully",
      stock: { newStock: newStock },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Get all stock entries
exports.getAllStock = async (req, res, next) => {
  try {
    const stocks = await Stock.find();

    res.status(200).json({
      success: true,
      message: "Stock entries retrieved successfully",
      stocks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Get stock entry by ID
exports.getStockById = async (req, res, next) => {
  try {
    const stockId = req.params.id;

    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({
        success: false,
        error: "Stock entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stock entry retrieved successfully",
      stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Update stock entry by ID
exports.updateStockById = async (req, res, next) => {
  try {
    const stockId = req.params.id;

    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.send({
        success: false,
        error: "Stock entry not found",
      });
    }

    const updateData = {
      ProductId: req.body.ProductId || stock.ProductId,
      quantity: req.body.quantity || stock.quantity,
      currentPricePerUnit:
        req.body.currentPricePerUnit || stock.currentPricePerUnit,
      date: req.body.date || stock.date,
    };

    await Stock.findByIdAndUpdate(stockId, updateData);
    const updatedStock = await Stock.findById(stockId);
    res.status(200).json({
      success: true,
      message: "Stock entry updated successfully",
      stock: updatedStock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Delete stock entry by ID
exports.deleteStockById = async (req, res, next) => {
  try {
    const stockId = req.params.id;

    await Stock.findByIdAndDelete(stockId);

    res.status(200).json({
      success: true,
      message: "Stock entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
