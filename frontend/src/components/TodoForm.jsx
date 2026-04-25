import { useState } from "react";

export default function TodoForm({ onSubmit, initialValues = {}, onCancel }) {
  const [title, setTitle] = useState(initialValues.title ?? "");
  const [description, setDescription] = useState(initialValues.description ?? "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isEditing = Boolean(initialValues.id);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await onSubmit({ title: title.trim(), description: description.trim() || null });
      if (!isEditing) {
        setTitle("");
        setDescription("");
      }
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <input
          type="text"
          className={`input ${error ? "input--error" : ""}`}
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={255}
          aria-label="Todo title"
        />
        {error && <p className="field-error">{error}</p>}
      </div>
      <div className="form-group">
        <input
          type="text"
          className="input"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={1000}
          aria-label="Todo description"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={submitting}>
          {submitting ? "Saving…" : isEditing ? "Save Changes" : "Add Todo"}
        </button>
        {isEditing && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
