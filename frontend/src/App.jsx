import { useCallback, useEffect, useState } from "react";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "./api/todosApi";
import ErrorMessage from "./components/ErrorMessage";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTodos = useCallback(async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch {
      setError("Could not load todos. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  async function handleCreate(payload) {
    try {
      const created = await createTodo(payload);
      setTodos((prev) => [created, ...prev]);
    } catch (err) {
      const msg = err.response?.data?.detail ?? "Failed to create todo.";
      setError(Array.isArray(msg) ? msg[0].msg : msg);
      throw err;
    }
  }

  async function handleUpdate(id, payload) {
    try {
      const updated = await updateTodo(id, payload);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      const msg = err.response?.data?.detail ?? "Failed to update todo.";
      setError(Array.isArray(msg) ? msg[0].msg : msg);
      throw err;
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Failed to delete todo.");
      throw new Error("delete failed");
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">My Todo List</h1>
        <p className="app-subtitle">Stay organised, one task at a time.</p>
      </header>

      <main className="app-main">
        <ErrorMessage message={error} onDismiss={() => setError("")} />
        <section className="card">
          <h2 className="section-title">New Task</h2>
          <TodoForm onSubmit={handleCreate} />
        </section>

        <section className="card">
          <h2 className="section-title">Tasks</h2>
          {loading ? (
            <p className="loading">Loading…</p>
          ) : (
            <TodoList
              todos={todos}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}
