const mongoose = require("mongoose");
const productsSchema = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  image: String,
  location: String,
  postedAt: {type:Date} ,
  price: String,
});
const ProductsModel = mongoose.model("productsdatails", productsSchema);
module.exports = { ProductsModel };
