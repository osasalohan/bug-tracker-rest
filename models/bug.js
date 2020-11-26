const mongoose = require("mongoose");
const Project = require("./project");
const User = require("./user");

const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//removes bug from user and project instances before deleting
bugSchema.pre("remove", async function (next) {
  try {
    let user = await User.findById(this.user);
    let project = await Project.findById(this.project);
    user.bugs.remove(this.id);
    project.bugs.remove(this.id);
    await user.save();
    await project.save();
    next();
  } catch (err) {
    return next(err);
  }
});

const Bug = mongoose.model("Bug", bugSchema);

module.exports = Bug;
