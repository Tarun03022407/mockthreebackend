const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config()

// const { ProductsModel } = require("./models/products.model");
const {productsRouter}=require("./routes/products.routes")




const { connection } = require("./configs/db");

app.use("/products",productsRouter)






app.listen(process.env.port, async () => {
  try {
    await connection;
    // console.log(connection);
    console.log("connected to db");
  } catch (error) {
    console.log(error.message);
    // res.send("something went wrong")
  }
  console.log(`server running at ${process.env.port} `);
});
