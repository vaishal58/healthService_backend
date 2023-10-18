const Order = require("../models/Order");
const Product = require("../models/Products");
const Customer = require("../models/Customer");

exports.getDashboardData = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const ShringarProducts = await Product.countDocuments({
        category: "650837d4f32a06ef841fa5d6",
    });
    const SilverVesselsProducts = await Product.countDocuments({
        category: "650837faf32a06ef841fa5d8",
    });
    const SugandhiProducts = await Product.countDocuments({
        category: "65083812f32a06ef841fa5da",
    });
    const PichwaiAndWallArtProducts = await Product.countDocuments({
        category: "6508382bf32a06ef841fa5dc",
    });
    const Vastra = await Product.countDocuments({
        category: "65083839f32a06ef841fa5de",
    });

    const FibreItems = await Product.countDocuments({
        category: "65083849f32a06ef841fa5e0",
    });

    const SeasonalProducts = await Product.countDocuments({
        category: "6508385bf32a06ef841fa5e2",
    });

   
    const customers = await Customer.countDocuments({ deleted: false });

    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "pending" });
    const processingOrders = await Order.countDocuments({
      status: "processing",
    });
    const completedOrders = await Order.countDocuments({ status: "completed" });
    const cancelledOrders = await Order.countDocuments({ status: "cancelled" });
    const returnOrders = await Order.countDocuments({ status: "return" });

    return res.send({
      orders: {
        totalOrders: totalOrders,
        pendingOrders: pendingOrders,
        processingOrders: processingOrders,
        completedOrders: completedOrders,
        cancelledOrders: cancelledOrders,
        returnOrders: returnOrders,
      },
      products: {
        totalProducts: totalProducts,
        ShringarProducts: ShringarProducts,
        SilverVesselsProducts: SilverVesselsProducts,
        SugandhiProducts: SugandhiProducts,
        PichwaiAndWallArtProducts: PichwaiAndWallArtProducts,
        Vastra: Vastra,
        FibreItems: FibreItems,
        SeasonalProducts: SeasonalProducts
      },
      customers: customers,
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};
