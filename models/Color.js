const mongoose = require("mongoose");


const colorSchema = new mongoose.Schema({
    name: { type: String},
    createdAt: { type: Date, default: Date.now },
  });
  
  const Color = mongoose.model("Color", colorSchema);
  
  module.exports = Color;