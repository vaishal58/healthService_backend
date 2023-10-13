const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Product = require("../models/Products");
const GST = require("../models/Gst");
const Stock = require("../models/Stock");

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().lean();
    if (orders.length === 0) {
      return res.end();
    }
    return res.send({ orders });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.createOrder = async (req, res, next) => {
  const {
    customer,
    FirstName,
    LastName,
    products,
    status,
    totalAmount,
    country,
    state,
    city,
    postCode,
    shippingAddress,
    paymentMethod,
    couponCode,
    giftVoucher,
  } = req.body;

  try {
    products.forEach((element) => {
      Stock.find({
        $and: [
          { ProductId: element.product },
          { quantity: { $gt: 0 } }
        ]
      }).then((filteredStock) => {
        const itemWithOldestDate = filteredStock.reduce(
          (oldestItem, currentItem) => {
            if (
              !oldestItem ||
              currentItem.date.getTime() < oldestItem.date.getTime()
            ) {
              return currentItem;
            }
            return oldestItem;
          },
          null
        );

        console.log(itemWithOldestDate);
        console.log(itemWithOldestDate.quantity - element.quantity);
        const updatedQuantity = itemWithOldestDate.quantity - element.quantity;
        Stock.findByIdAndUpdate(itemWithOldestDate._id, {
          quantity: updatedQuantity,
        }).then((filteredStock) => {

          console.log(filteredStock)
        });
      });
    });

    const newOrder = await Order.create({
      customer: customer,
      FirstName: FirstName,
      LastName: LastName,
      products: products,
      status: status,
      totalAmount: totalAmount,
      country: country,
      state: state,
      city: city,
      postCode: postCode,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      // couponCode: couponCode,
      // giftVoucher: giftVoucher,
    });

    return res.send({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

// Make sure to use the correct path to your Product model

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Fetch details of each product in the order
    const products = await Promise.all(
      order.products.map(async (product) => {
        const productDetails = await Product.findById(product.product);
        const gstDetails = await GST.findById(productDetails.gst);

        // You can include other details if needed
        return {
          product: {
            ...productDetails._doc,
            gst: gstDetails ? gstDetails.gst : null,
          },
          quantity: product.quantity,
          // Include other details if needed
        };
      })
    );

    // Combine the order details with product details
    const orderWithProductDetails = {
      order,
      products,
    };

    return res.send({ success: true, orderWithProductDetails });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.updateOrder = async (req, res, next) => {
  const orderId = req.params.id;
  const updateData = {
    status: req.body.status,
    updatedAt: Date.now(),
  };

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });

    if (!updatedOrder) {
      return res.send({ error: "Order not found" });
    }

    return res.send({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const deletedOrder = await Order.findByIdAndRemove(orderId);

    if (!deletedOrder) {
      return res.send({ error: "Order not found" });
    }

    return res.send({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};
