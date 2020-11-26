const express = require("express");
const router = express.Router();
const auth = require("../handlers/auth");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("form", { register: true });
});

router.get("/signin", (req, res) => {
  res.render("form");
});

router.post("/signup", auth.signup);

router.post("/signin", auth.signin);

router.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = router;
