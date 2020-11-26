const db = require("../models");

//populate bugs array of a project and passes the project variable to bugs page
exports.getBugs = async (req, res, next) => {
  try {
    let user = await db.User.findById(req.params.id);
    let { id, firstName } = user;
    let project = await db.Project.findById(req.params.project_id).populate(
      "bugs"
    );
    res.render("bugs", {
      id,
      firstName,
      project,
    });
  } catch (err) {
    res.render("dashboard", { error: err.message });
  }
};

//creates new bug and adds to a project and user instance
exports.addBug = async (req, res, next) => {
  try {
    let bug = await db.Bug.create({
      ...req.body,
      user: req.params.id,
      project: req.params.project_id,
    });
    let user = await db.User.findById(req.params.id);
    let project = await db.Project.findById(req.params.project_id);
    user.bugs.push(bug.id);
    project.bugs.push(bug.id);
    await user.save();
    await project.save();
    res.redirect("back");
  } catch (err) {
    res.render("bugs", { error: err.message });
  }
};

//gets particular bug, populates comments instance and passes bug variable to bug page
exports.getBug = async (req, res, next) => {
  try {
    let user = await db.User.findById(req.params.id);
    let { id, firstName, userType } = user;
    let bug = await db.Bug.findById(req.params.bug_id).populate({
      path: "comments",
      populate: { path: "user", model: "User" },
    });
    console.log(bug);
    res.render("bug", {
      id,
      firstName,
      userType,
      bug,
    });
  } catch (err) {
    res.render("bugs", { error: err.message });
  }
};

//updates a bug and refreshes page
exports.updateBug = async (req, res, next) => {
  try {
    await db.Bug.findByIdAndUpdate(req.params.bug_id, req.body);
    res.redirect("back");
  } catch (err) {
    res.render("bug", { error: err.message });
  }
};

//deletes a bug and refreshes page
exports.deleteBug = async (req, res, next) => {
  try {
    await db.Bug.findByIdAndRemove(req.params.bug_id);
    res.redirect("back");
  } catch (err) {
    res.render("bugs", { error: err.message });
  }
};
