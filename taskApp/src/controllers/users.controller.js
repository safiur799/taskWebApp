const express = require("express");
const User = require("../models/users.models");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me", auth, async function (req, res) {
  res.send(req.user);
});
router.get("/", async function (req, res) {
  const user = await User.find().exec();
  res.send(user);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateAuthToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken(user);
    res.send({ user, token });
  } catch (err) {
    return res.status(400).send(err);
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

router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdate = ["name", "email", "password", "age"];
  const isValidate = updates.every((update) => allowUpdate.includes(update));
  if (!isValidate) {
    return res.status(404).send({ error: "Invalid update" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      res.status(404).send();
    }
    res.status(201).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "user is not present" });
    }
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = router;
