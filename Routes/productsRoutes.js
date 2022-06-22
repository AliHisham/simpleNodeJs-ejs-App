const express = require("express");

const routes = (product) => {
  const productRouter = express.Router();
  productRouter.route("/products").get((req, res) => {
    product.find((err, result) => {
      if (err) {
        res.send(err);
      }

      res.render("products.ejs", { products: result });
    });
  });

  productRouter.route("/product/:id").get((req, res) => {
    product.findById(req.params.id, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.render("product.ejs", { product: result });
    });
  });
  productRouter.route("/home").get((req, res) => {
    product.find((err, result) => {
      if (err) {
        res.send(err);
      }

      res.render("home.ejs", { products: result });
    });
  });
  return productRouter;
};

module.exports = routes;
