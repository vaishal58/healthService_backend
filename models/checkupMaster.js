const mongoose = require("mongoose");

const checkupNameMasterSchema = new mongoose.Schema({

  checkupName:{
    type: String,
    
  },

  checkupType:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"CheckupType",
  },

  checkupDate:{
    type: String, 
    default:Date.now().toLocaleString()
  },

  companyId : {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Company",
  },

  location:{
    type: String
  }

});


module.exports = mongoose.model("CheckupName", checkupNameMasterSchema);