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


  companyCheckupName:[
    {
      checkupNameId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"CheckupName",
      }],
    }
  ],
   
  name1:{
    type:String
  },
  email1:{
    type:String
  },
  number1:{
    type:String
  },
  designation1:{
    type:String
  },

  name2:{
    type:String
  },
  email2:{
    type:String
  },
  number2:{
    type:String
  },
  designation2:{
    type:String
  },

  name3:{
    type:String
  },
  email3:{
    type:String
  },
  number3:{
    type:String
  },
  designation3:{
    type:String
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


module.exports = mongoose.model("Company", companySchema);