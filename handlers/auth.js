const db = require("../models");
const jwt = require("jsonwebtoken");

//check if user exists and password is correct. Redirect to dashboard if true else show error
exports.signin = async (req, res, next) => {
  try {
    let user = await db.User.findOne({
      email: req.body.email,
    });
    let { id, firstName, userType } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          firstName,
          userType,
        },
        process.env.SECRET_KEY
      );
      res.locals.token = token;
      res.redirect(`/dashboard/${id}/projects`);
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

//create a new user and redirect to dashboard else display error
exports.signup = async (req, res, next) => {
  try {
    let user = await db.User.create(req.body);
    let { id, firstName, userType } = user;
    let token = jwt.sign(
      {
        id,
        firstName,
        userType,
      },
      process.env.SECRET_KEY
    );
    res.locals.token = token;
    res.redirect(`/dashboard/${id}/projects`);
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
