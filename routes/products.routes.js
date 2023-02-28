const express = require("express");
const { ProductsModel } = require("../models/products.model");

const productsRouter = express.Router();


productsRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = new ProductsModel(payload);
    await new_note.save();
    res.status(200).send("new product added successfully");
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong" });
  }
});
// productsRouter.get("/", async (req, res) => {
//   const name = req.query.name;
//   try {
//     const movie = await ProductsModel.find(  { name: { $regex: "(?i)^" + name } });
//     res.send(movie);
//   } catch (error) {
//     console.log(error);
//   }
// });
// productsRouter.get("/", async (req, res) => {
//   // let query = req.query;
//   let page = req.query.page;
//   let pagesize = req.query.limit;
//   try {
//     const products = await ProductsModel.find().limit(pagesize*1).skip((page -1)* pagesize);
//     res.send(products);
//   } catch (error) {
//     console.log(error);
//     res.send({ error: "something went wrong" });
//   }
// });
// productsRouter.get("/", async (req, res) => {
//   let query = req.query;
//   try {
//     const movies = await ProductsModel.find().sort(query);
//     res.send(movies);
//   } catch (error) {
//     console.log(error);
//     res.send({ error: error });
//   }
// });


productsRouter.get("/", async (req, res) => {
  const { page = 1, limit = 4, category, input, postedAt } = req.query;
  try {
    if (postedAt && category) {
      if (postedAt === "asc") {
        let product = await ProductsModel.find({ category })
          .sort({postedAt:1})
          .skip((page - 1) * limit)
          .limit(limit);
        return res.status(200).send(product);
      } else if (postedAt === "desc") {
        let product = await ProductsModel.find({ category })
          .sort({postedAt:-1})
          .skip((page - 1) * limit)
          .limit(limit);
        return res.status(200).send(product);
      }
    } else if (input && category) {
      let temp = new RegExp(input, "i");
      let product = await ProductsModel.find({ name: temp }).limit(limit);
      return res.status(200).send(product);
    } else if (category) {
      let product = await ProductsModel.find({ category })
        .skip((page - 1) * limit)
        .limit(limit);
      return res.status(200).send(product);
    } else if (input) {
      let temp = new RegExp(input, "i");
      let product = await ProductsModel.find({ name: temp }).limit(limit);
      return res.status(200).send(product);
    } else {
      let product = await ProductsModel.find()
        .skip((page - 1) * limit)
        .limit(limit);
      return res.status(200).send(product);
    }
  } catch (error) {
    return res.send(error.message);
  }
});






module.exports = { productsRouter };
