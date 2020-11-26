const express = require("express");
const router = express.Router();
const auth = require("../handlers/auth");

//home page
router.get("/", (req, res) => {
  res.render("index");
});

//sign up page
router.get("/signup", (req, res) => {
  res.render("form", { register: true });
});

//sign in page
router.get("/signin", (req, res) => {
  res.render("form");
});

//sign up post route
router.post("/signup", auth.signup);

//sign in post route
router.post("/signin", auth.signin);

//log out route
router.get("/logout", (req, res) => {
  res.locals.token = false;
  res.redirect("/");
});

module.exports = router;
