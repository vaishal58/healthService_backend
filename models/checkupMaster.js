const mongoose = require("mongoose");

const checkuopMasterSchema = new mongoose.Schema({
  checkupName:{
    type: String,
    
  },
  checkupType:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Employee",
  },
  checkupDate:{
    type: String, 
  },
  companyJobCategorys: [{
    type: String,
  }],
  companyDepartments:[
    {
        type: String,
    }
  ],
  
  //other changes remaining
});


module.exports = mongoose.model("Checkup", checkuopMasterSchema);