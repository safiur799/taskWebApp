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

router.patch("/:id", async function (req, res) {
  const updates = Object.keys(req.body);
  const allowUpdate = ["description", "completed"];
  const isValidate = updates.every((update) => allowUpdate.includes(update));

  if (!isValidate) {
    return res.status(404).send({ error: "Invlaid update for task" });
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    // });
    return res.status(200).send(task);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "task does not exit" });
    }
    return res.status(200).send(task);
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
