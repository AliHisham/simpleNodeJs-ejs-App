const express = require("express");
const jwt = require("jsonwebtoken");
const {
  productsAuthentication,
} = require("../Middelware/authenticationMiddleWare");

const tokenGenerator = (id) => {
  let convertedId = id.toString();

  return jwt.sign({ convertedId }, "password");
};

const routes = (product, user) => {
  const productRouter = express.Router();
  productRouter.route("/products").get(productsAuthentication, (req, res) => {
    product.find((err, result) => {
      if (err) {
        res.send(err);
      }

      res.render("products.ejs", { products: result });
    });
  });

  productRouter
    .route("/product/:id")
    .get(productsAuthentication, (req, res) => {
      product.findById(req.params.id, (err, result) => {
        if (err) {
          res.send(err);
        }
        res.render("product.ejs", { product: result });
      });
    });
  productRouter.route("/home").get(productsAuthentication, (req, res) => {
    product.find((err, result) => {
      if (err) {
        res.send(err);
      }

      res.render("home.ejs", { products: result });
    });
  });
  productRouter
    .route("/signup")
    .get((req, res) => {
      res.render("signup");
    })
    .post(async (req, res) => {
      try {
        const { name, email, password } = req.body;
        const createdUser = await user.create({ name, email, password });
        const token = tokenGenerator(createdUser._id);

        res.cookie("jstoken", token);
        res.status(201).json({ user: createdUser.id.toString() });
      } catch (err) {
        res.status(400).json(err);
      }
    });

  productRouter
    .route("/login")
    .get((req, res) => {
      res.render("login.ejs");
    })
    .post(async (req, res) => {
      const email = req.body.email;
      const existingUser = await user.findOne({ email });
      if (existingUser) {
        if (existingUser.password === req.body.password) {
          const token = tokenGenerator(existingUser._id);
          res.cookie("jstoken", token);
          res.json({ done: "done" });
        } else {
          res.json({ error: "incorrect password" });
        }
      } else {
        res.json({ error: "not found" });
      }
    });
  productRouter.route("/logout").get((req, res) => {
    res.cookie("jstoken", "");
    res.redirect("/");
  });

  return productRouter;
};

module.exports = routes;
