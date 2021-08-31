const express = require("express");
const router = express.Router();
const Task = require("../models/task.models");

router.post("/", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", async function (req, res) {
  try {
    const task = await Task.find().lean().exec();
    return res.status(200).send(task);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const task = await Task.findById(req.params.id).lean().exec();
    return res.status(200).send(task);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
