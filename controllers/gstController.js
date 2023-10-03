const gstModel = require('../models/Gst'); // Import the SubCategory model

exports.addGst = async (req, res, next) => {
    try {
      const {gst} = req.body
      
      const body = {
        gst:gst,
        sgst:gst/2,
        cgst:gst/2,
        igst:gst
      }
      
      const newSubCategory = await gstModel.create(body);
      res.send({
        success: true,
        newSubCategory,
        msg: "gst added",
      });
    } catch (error) {
      return res.send({ error: error.message });
    }
  };
  


exports.getGst = async (req, res) => {
  try {
    const subCategories = await gstModel.find({ isDeleted: false });
    return res.send(subCategories);
  } catch (err) {
    return res.send({ error: 'Server error' });
  }
};


