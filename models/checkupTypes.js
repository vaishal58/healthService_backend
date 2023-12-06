const mongoose = require("mongoose");

const checkupTypeMasterSchema = new mongoose.Schema({

  checkupType:{
    type: String,
  },

});


module.exports = mongoose.model("CheckupType", checkupTypeMasterSchema);