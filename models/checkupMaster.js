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
  },

  // jovanu filter vise
  allCheckUps:[
    {
      employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Employee",
      },
      checkupDateId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"CheckupData",
      }
    }
  ]
});


module.exports = mongoose.model("CheckupName", checkupNameMasterSchema);