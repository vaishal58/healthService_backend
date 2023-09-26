const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled" , "returns"],
    default: "pending",
  },
  totalAmount: {
    type: Number,
  },
  billingAddress: {
    type: String,
  },
  shippingAddress: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  couponCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
