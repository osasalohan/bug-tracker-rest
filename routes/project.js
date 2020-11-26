const express = require("express");
const router = express.Router({ mergeParams: true });
const { loginRequired, ensureCorrectUser } = require("../middleware/auth");
const {
  getProjects,
  addProject,
  deleteProject,
} = require("../handlers/project");

// router.use(loginRequired, ensureCorrectUser);

router.get("/projects", getProjects);
router.post("/projects", addProject);
router.delete("/projects/:project_id", deleteProject);

module.exports = router;
