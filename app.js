require("dotenv").config();

const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const bugRoutes = require("./routes/bug");
const commentRoutes = require("./routes/comment");
const errorHandler = require("./handlers/error");

const app = express();

//set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//available routes
app.use("/", authRoutes);
app.use("/dashboard/:id", projectRoutes);
app.use("/dashboard/:id/projects/:project_id", bugRoutes);
app.use("/dashboard/:id/projects/:project_id/bugs/:bug_id", commentRoutes);

//handle errors with useful messages
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
