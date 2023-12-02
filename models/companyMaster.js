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
   
  companyMember : [
    {
      name:{
        type:String
      },
      email:{
        type:String
      },
      number:{
        type:String
      },
      email:{
        type:String
      }
    }
  ],
  
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