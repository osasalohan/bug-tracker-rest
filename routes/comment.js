const express = require("express");
const router = express.Router({ mergeParams: true });
const { loginRequired, ensureCorrectUser } = require("../middleware/auth");
const {
  getComments,
  addComment,
  deleteComment,
} = require("../handlers/comment");

// router.use(loginRequired, ensureCorrectUser);

router.post("/comments", addComment);

router.delete("/comments/:comment_id", deleteComment);

module.exports = router;
