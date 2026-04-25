import { useState } from "react";
import TodoForm from "./TodoForm";

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleToggle() {
    await onUpdate(todo.id, { completed: !todo.completed });
  }

  async function handleEdit(payload) {
    await onUpdate(todo.id, payload);
    setEditing(false);
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await onDelete(todo.id);
    } catch {
      setDeleting(false);
    }
  }

  if (editing) {
    return (
      <li className="todo-item todo-item--editing">
        <TodoForm
          initialValues={todo}
          onSubmit={handleEdit}
          onCancel={() => setEditing(false)}
        />
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? "todo-item--done" : ""}`}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
        />
        <span className="checkmark" />
      </label>

      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        {todo.description && (
          <span className="todo-description">{todo.description}</span>
        )}
      </div>

      <div className="todo-actions">
        <button
          className="btn btn--ghost btn--sm"
          onClick={() => setEditing(true)}
          aria-label="Edit todo"
        >
          Edit
        </button>
        <button
          className="btn btn--danger btn--sm"
          onClick={handleDelete}
          disabled={deleting}
          aria-label="Delete todo"
        >
          {deleting ? "…" : "Delete"}
        </button>
      </div>
    </li>
  );
}
