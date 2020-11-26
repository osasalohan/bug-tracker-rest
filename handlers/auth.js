const db = require("../models");
// const jwt = require("jsonwebtoken");

exports.signin = async (req, res, next) => {
  try {
    let user = await db.User.findOne({
      email: req.body.email,
    });
    let { id } = user;
    // let { id, firstName, userType } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      // let token = jwt.sign(
      //   {
      //     id,
      //     firstName,
      //     userType,
      //   },
      //   process.env.SECRET_KEY
      // );
      // res.render("dashboard", {
      //   id,
      //   firstName,
      //   userType,
      //   token,
      // });
      res.redirect(`/dashboard/${id}/projects`)
    } else {
      res.render("form", {
        error: "Password is incorrect",
      });
    }
  } catch (err) {
    res.render("form", {
      error: "Invalid email/password",
    });
  }
};

exports.signup = async (req, res, next) => {
  try {
    let user = await db.User.create(req.body);
    let { id } = user;
    // let { id, firstName, userType } = user;
    // let token = jwt.sign(
    //   {
    //     id,
    //     firstName,
    //     userType,
    //   },
    //   process.env.SECRET_KEY
    // );
    // res.render("dashboard", {
    //   id,
    //   firstName,
    //   userType,
    //   token,
    // });
    res.redirect(`/dashboard/${id}/projects`)
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, email is taken";
    }
    res.render("form", {
      register: true,
      error: err.message || "Oops! Something went wrong",
    });
  }
};
