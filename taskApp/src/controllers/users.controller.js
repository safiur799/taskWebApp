const express = require("express");
const User = require("../models/users.models");
const router = express.Router();

router.get("/", async function (req, res) {
  const user = await User.find().lean().exec();
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const user = await User.findById(req.params.id).lean().exec();
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
