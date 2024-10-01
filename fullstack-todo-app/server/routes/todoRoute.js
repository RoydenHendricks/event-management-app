const express = require("express");

const {
  createTodo,
  getAllTodos,
  updateCompleteTodo,
  updateTodoDescription,
  deleteTodo,
} = require("../controllers/todoController");

// middleware
const authenticateToken = require("../middleware/auth.middleware");
const validateContent = require("../middleware/validateContent");

const router = express.Router();

// routes
router.post("/todos", authenticateToken, validateContent, createTodo);
router.get("/todos", authenticateToken, getAllTodos);
router.put("/todos/:id/complete", authenticateToken, updateCompleteTodo);
router.put(
  "/todos/:id/description",
  authenticateToken,
  validateContent,
  updateTodoDescription
);
router.delete("/todos/:id", authenticateToken, deleteTodo);

module.exports = router;
