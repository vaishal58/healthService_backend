const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName:{
    type: String,
    required: [true, "Please enter your name!"],
  },
  companyEmployees:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Employee",
  }],
  companyLocation:[{
    type: String,
    
  }],
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


module.exports = mongoose.model("Company", companySchema);