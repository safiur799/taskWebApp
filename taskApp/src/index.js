const express = require("express");
const connect = require("./config/db");

const app = express();
app.use(express.json());
const userController = require("./controllers/users.controller");
const taskController = require("./controllers/task.controller");

app.use("/users", userController);
app.use("/tasks", taskController);

app.listen(3332, async () => {
  await connect();
  console.log("this is working");
});
