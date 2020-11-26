const express = require("express");
const router = express.Router({ mergeParams: true });
const { loginRequired, ensureCorrectUser } = require("../middleware/auth");
const {
  getBugs,
  addBug,
  getBug,
  updateBug,
  deleteBug,
} = require("../handlers/bug");

// router.use(loginRequired, ensureCorrectUser);

//get bugs route
router.get("/bugs", getBugs);

//add bug route
router.post("/bugs", addBug);

//show bug route
router.get("/bugs/:bug_id", getBug);

//update bug route
router.put("/bugs/:bug_id", updateBug);

//delete bug route
router.delete("/bugs/:bug_id", deleteBug);

module.exports = router;
