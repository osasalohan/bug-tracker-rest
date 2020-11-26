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

router.get("/bugs", getBugs);
router.post("/bugs", addBug);
router.get("/bugs/:bug_id", getBug);
router.put("/bugs/:bug_id", updateBug);
router.delete("/bugs/:bug_id", deleteBug);

module.exports = router;
