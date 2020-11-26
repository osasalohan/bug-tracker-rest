const mongoose = require("mongoose");
const User = require("./user");
const Bug = require("./bug");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  bug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bug",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//removes comment from user and bug instances before deleting
commentSchema.pre("remove", async function (next) {
  try {
    let user = await User.findById(this.user);
    let bug = await Bug.findById(this.bug);
    user.comments.remove(this.id);
    bug.comments.remove(this.id);
    await user.save();
    await bug.save();
    next();
  } catch (err) {
    return next(err);
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
