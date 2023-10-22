const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  size: { type: Number },
});

const Size = mongoose.model("Size", sizeSchema);

module.exports = Size;
