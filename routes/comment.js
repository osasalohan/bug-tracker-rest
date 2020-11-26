const express = require("express");
const router = express.Router({ mergeParams: true });
const { loginRequired, ensureCorrectUser } = require("../middleware/auth");
const {
  getComments,
  addComment,
  deleteComment,
} = require("../handlers/comment");

// router.use(loginRequired, ensureCorrectUser);

//add comment route
router.post("/comments", addComment);

//delete comment route
router.delete("/comments/:comment_id", deleteComment);

module.exports = router;
