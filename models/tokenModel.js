const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokenSchema = new mongoose.Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    required : true,
    ref : "user"
  },
  customerId : {
    type: mongoose.Schema.Types.ObjectId,
    required : true,
    ref : "Customer"
  },
  token : {
    type : String,
    required : true,
  },
  createdAt : {
    type : Date,
    required : true,
  },
  expiresAt : {
    type : Date,
    required : true,
  }
})

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;