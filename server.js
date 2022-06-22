const express = require("express");
const connectionString =
  "mongodb+srv://alii:123@cluster0.y3uv4.mongodb.net/nodeJsDb?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const productModel = require("./Models/product");
const myApp = express();
const productRouter = require("./Routes/productsRoutes")(productModel);
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(connectionString, connectionParams)
  .then(() => {
    console.log("connected succefully to the db");
  })
  .catch((err) => {
    console.log(err, "errorrrr ");
  });

myApp.set("view engine", "ejs");

const port = 4000;

myApp.get("/", (req, res) => {
  productModel.find((err, result) => {
    if (err) {
      res.send(err);
    }
    res.render("welcome.ejs");
  });
});

myApp.use("/", productRouter);
myApp.listen(port, () => {});