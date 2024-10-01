const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  // todo description
  description: {
    type: String,
    required: true,
  },

  // todo completion status
  completed: {
    type: Boolean,
    default: false,
  },

  // user id
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
