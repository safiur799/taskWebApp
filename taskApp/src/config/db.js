const mongoose = require("mongoose");

const connect = async () => {
  return mongoose.connect("mongodb://localhost:27017/task-manager", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;
