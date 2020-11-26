const db = require("../models");

//creates comment and adds it to a bug and user instance
exports.addComment = async (req, res, next) => {
  try {
    let comment = await db.Comment.create({
      ...req.body,
      user: req.params.id,
      bug: req.params.bug_id,
    });
    let user = await db.User.findById(req.params.id);
    let bug = await db.Bug.findById(req.params.bug_id);
    user.comments.push(comment.id);
    bug.comments.push(comment.id);
    await user.save();
    await bug.save();
    res.redirect("back");
  } catch (err) {
    res.render("bug", { error: err.message });
  }
};

//deletes comment and refreshes page
exports.deleteComment = async (req, res, next) => {
  try {
    await db.Comment.findByIdAndRemove(req.params.comment_id);
    res.redirect("back");
  } catch (err) {
    res.render("bug", { error: err.message });
  }
};
