const Color = require("../models/Color");


exports.getColors = async (req, res, next) => {
    try {
      const color = await Color.find().lean();
      if (color.length === 0) {
        return res.end();
      }
      return res.send({ success: true, color });
    } catch (error) {
      return res.send({ error: error.message });
    }
  };
  
  exports.addColor = async (req, res, next) => {
    try {
      const body = {
        name: req.body.name,
      };
      const newRecordAdded = await Color.create(body);
      res.send({
        success : true,
        data: newRecordAdded,
        msg: "Material added",
      });
    } catch (error) {
      return res.send({ error: error.message });
    }
  };
