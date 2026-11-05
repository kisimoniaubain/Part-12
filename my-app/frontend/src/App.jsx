import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Checking connection...");

  async function loadTasks() {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error("API unavailable");
      const data = await response.json();
      setTasks(data);
      setStatus("Connected");
    } catch {
      setStatus("Disconnected");
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(event) {
    event.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error("Could not add task");

      setTitle("");
      await loadTasks();
    } catch {
      setStatus("Disconnected");
    }
  }

  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="/">DevEnv22<span>.</span></a>
        <span className={`connection ${status === "Connected" ? "online" : ""}`}>
          <span className="dot"></span>{status}
        </span>
      </header>

      <section className="hero">
        <p className="eyebrow">FULL STACK OPEN · EXERCISE 22</p>
        <h1>My Containerized<br /><span>Development Environment.</span></h1>
        <p className="intro">
          A full-stack development workspace powered by Docker,
          React, Node.js and MongoDB.
        </p>
      </section>

      <section className="dashboard">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WORKSPACE</p>
            <h2>Development tasks</h2>
          </div>
          <span className="task-count">{tasks.length} tasks</span>
        </div>

        <form className="task-form" onSubmit={addTask}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What are you working on?"
            aria-label="New task title"
          />
          <button type="submit">Add task +</button>
        </form>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Add your first development task.</p>
          ) : (
            tasks.map((task) => (
              <div className="task" key={task._id}>
                <span className="task-icon">◇</span>
                <span>{task.title}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <footer>
        <span>DevEnv22</span>
        <span>Built for Full Stack Open · Exercise 22</span>
      </footer>
    </main>
  );
}

export default App;