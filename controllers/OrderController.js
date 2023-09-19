const Order = require('../models/Order');

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
    products,
    status,
    totalAmount,
    billingAddress,
    shippingAddress,
    paymentMethod,
    couponCode,
    giftVoucher,
  } = req.body;

  try {
    const newOrder = await Order.create({
      customer: customer,
      products: products,
      status: status,
      totalAmount: totalAmount,
      billingAddress: billingAddress,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      couponCode: couponCode,
      giftVoucher: giftVoucher,
    });

    return res.send({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.send({ error: 'Order not found' });
      } else {
        res.send({ success: true, order });
      }
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
      return res.send({ error: 'Order not found' });
    }

    return res.send({
      success: true,
      message: 'Order updated successfully',
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
      return res.send({ error: 'Order not found' });
    }

    return res.send({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};
