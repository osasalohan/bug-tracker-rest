const mongoose = require("mongoose");
const User = require("./user");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bugs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bug",
    },
  ],
});

//removes project from user instance before deleting
projectSchema.pre("remove", async function (next) {
  try {
    let user = await User.findById(this.user);
    user.projects.remove(this.id);
    await user.save();
    next();
  } catch (err) {
    return next(err);
  }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
