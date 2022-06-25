const jwt = require("jsonwebtoken");

const productsAuthentication = (req, res, next) => {
  const token = req.cookies.jstoken;
  if (token) {
    jwt.verify(token, "password", (err, dectok) => {
      if (err) {
        res.redirect("/login");
      } else {
        console.log(dectok, "checking");
      }
    });
  } else {
    res.redirect("/login");
  }
  next();
};
module.exports = { productsAuthentication };
