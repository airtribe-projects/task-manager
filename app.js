const express = require("express");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(taskRoutes);

module.exports = app;
