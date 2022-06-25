const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectionString =
  "mongodb+srv://alii:123@cluster0.y3uv4.mongodb.net/nodeJsDb?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const productModel = require("./Models/product");
const userModel = require("./Models/user");
const myApp = express();
myApp.use(bodyParser.json());
myApp.use(cookieParser());
const productRouter = require("./Routes/productsRoutes")(
  productModel,
  userModel
);
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
myApp.use(express.json());

const port = process.env.PORT || 4000;

myApp.get("/", (req, res) => {
  res.render("welcome.ejs");
});

myApp.use("/", productRouter);
myApp.listen(port, () => {});
