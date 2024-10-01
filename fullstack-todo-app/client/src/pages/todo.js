// src/pages/todo.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTodo from "../components/editTodo";
import "./todo.css";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [addingTodo, setAddingTodo] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  // reusable function for api calls
  const apiCall = async (method, url, data = null) => {
    try {
      const response = await axios({
        method: method,
        url: `${process.env.REACT_APP_API_TODOS}${url}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: data,
      });

      // return response data
      return response.data;
    } catch (error) {
      // handle error
      console.error(`Error with ${method} request to ${url}`, error);
    }
  };

  // Function to show loading message after a delay
  const showLoadingWithDelay = () => {
    setTimeout(() => {
      setShowLoading(true);
    }, 500); // 500ms delay
  };

  // async function that fetches todo data
  const fetchTodos = async () => {
    showLoadingWithDelay();
    setLoading(true); // Show loading indicator
    try {
      const data = await apiCall("get", "/");
      setTodos(data.message || []);
    } catch (error) {
      console.log("Error fetching todos", error);
    } finally {
      setLoading(false); // Hide loading indicator
      setShowLoading(false);
    }
  };

  // async function that handles adding a todo
  const handleAddTodo = async () => {
    showLoadingWithDelay();
    setAddingTodo(true); // show adding todo indicator
    try {
      const data = await apiCall("post", "/", { description: newTodo });
      //set todo state with the new todo
      setTodos([...todos, data.message]);
      // fetch todos
      fetchTodos();
      // clear input
      setNewTodo("");
    } catch (error) {
      alert("Error adding todo , todo can not exceed 140 characters");
      console.log("Error adding todo", error);
    } finally {
      setAddingTodo(false); // Hide adding message after add
      setShowLoading(false); // hide adding todo indicator
    }
  };

  // async function that handles deleting a todo
  const handleDeleteTodo = async (id) => {
    try {
      await apiCall("delete", `/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error deleting todo", error);
    }
  };

  // async function that handles completion status a todo
  const handleCompleteTodo = async (id, completed) => {
    try {
      await apiCall("put", `/${id}/complete`, { completed: !completed });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      console.log("Error updating todo", error);
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-heading">Your Todos</h1>

      <div className="add-todo-section">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo} disabled={addingTodo}>
          {addingTodo ? "Adding..." : "Add"}
        </button>
      </div>

      {/* ---------------------------------- Todo list ---------------------------------- */}

      {loading && showLoading && <p>Loading todos...</p>}

      <ul>
        {todos.map((todo) => (
          <li
            className={`todo-item ${todo.completed ? "todo-completed" : ""}`}
            key={todo._id}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCompleteTodo(todo._id, todo.completed)}
                disabled={todo.completed}
              />
              <div className="todo-description">{todo.description}</div>
            </div>
            <div className="todo-buttons">
              <EditTodo todo={todo} fetchTodo={fetchTodos} />
              <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
