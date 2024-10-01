import Login from "./components/login";
import Register from "./components/register";
import TodoPage from "./pages/todo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div style={{ marginTop: "-3.5rem" }}>
        <BrowserRouter>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/todo" element={<TodoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
