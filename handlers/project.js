const db = require("../models");

//get all projects and pass as variable to dashboard page to be rendered
exports.getProjects = async (req, res, next) => {
  try {
    let user = await db.User.findById(req.params.id);
    let { id, firstName } = user;
    let projects = await db.Project.find({});
    res.render("dashboard", {
      id,
      firstName,
      projects,
    });
  } catch (err) {
    res.render("index", { error: err.message });
  }
};

//create a new project and add to user instance
exports.addProject = async (req, res, next) => {
  try {
    let project = await db.Project.create({
      title: req.body.title,
      user: req.params.id,
    });
    let user = await db.User.findById(req.params.id);
    user.projects.push(project.id);
    await user.save();
    res.redirect("back");
  } catch (err) {
    res.render("dashboard", { error: err.message });
  }
};

//delete a project and refresh page
exports.deleteProject = async (req, res, next) => {
  try {
    await db.Project.findByIdAndRemove(req.params.project_id);
    res.redirect("back");
  } catch (err) {
    res.render("dashboard", { error: err.message });
  }
};
