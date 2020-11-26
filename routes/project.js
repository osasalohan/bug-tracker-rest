const express = require("express");
const router = express.Router({ mergeParams: true });
const { loginRequired, ensureCorrectUser } = require("../middleware/auth");
const {
  getProjects,
  addProject,
  deleteProject,
} = require("../handlers/project");

// router.use(loginRequired, ensureCorrectUser);

//get projects route
router.get("/projects", getProjects);

//add project route
router.post("/projects", addProject);

//delete project route
router.delete("/projects/:project_id", deleteProject);

module.exports = router;
