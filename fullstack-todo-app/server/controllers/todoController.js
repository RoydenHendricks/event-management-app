const Todo = require("../models/todo.model");

const createTodo = async (req, res) => {
  // getting the description from the request body
  const { description } = req.body;

  try {
    const newTodo = new Todo({
      description,
      completed: false,
      user: req.user.id,
    });

    await newTodo.save();
    res.status(201).json({ message: "New todo created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred on the server while creating todo" });
  }
};

// function that gets all the todos from the logged in user
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json({ message: todos });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred on the server while  getting todos" });
  }
};

//update complete status
const updateCompleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // finding the todo by id and updating the completion status
    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    // if the toso is not found return an error message
    if (!updateTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          "Error occurred on the server while updating todo completion status",
      });
  }
};

const updateTodoDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    // finding the todo by id and updating the description
    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );

    // if the toso is not found return an error message
    if (!updateTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo description updated", todo: updateTodo });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error occurred on the server while updating todo description",
      });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const deleteTodo = await Todo.findByIdAndDelete(todoId);

    // if the toso is not found return an error message
    if (!deleteTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occurred on the server while deleting todo" });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  updateCompleteTodo,
  updateTodoDescription,
  deleteTodo,
};
