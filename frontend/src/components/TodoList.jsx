import TodoItem from "./TodoItem";

export default function TodoList({ todos, onUpdate, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet — add one above!</p>;
  }

  const pending = todos.filter((t) => !t.completed);
  const done = todos.filter((t) => t.completed);

  return (
    <div className="todo-list-wrapper">
      <p className="todo-count">
        {pending.length} remaining · {done.length} completed
      </p>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}
