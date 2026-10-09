const { config } = require("dotenv");
config();
const express = require("express");
const app = express();

const { router: taskRouter } = require("./routes/task.routes.js");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/tasks", taskRouter);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
