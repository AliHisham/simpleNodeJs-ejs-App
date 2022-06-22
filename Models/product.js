const mongoose = require("mongoose");
const { Schema } = mongoose;

const productModel = new Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("products", productModel);
