const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Task Management API",
  });
});

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

module.exports = app;