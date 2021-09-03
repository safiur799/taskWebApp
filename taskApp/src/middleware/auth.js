const User = require("../models/users.models");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", " ").trim();
    console.log(token);
    const decoded = jwt.verify(token, "thisiddone");
    console.log(decode);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log(user);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "please Authenticate" });
  }
};

module.exports = auth;
