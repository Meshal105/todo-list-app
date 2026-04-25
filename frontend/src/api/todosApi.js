import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-list-app-qgfn.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

export const fetchTodos = () => api.get("/todos/").then((r) => r.data);

export const createTodo = (payload) =>
  api.post("/todos/", payload).then((r) => r.data);

export const updateTodo = (id, payload) =>
  api.patch(`/todos/${id}`, payload).then((r) => r.data);

export const deleteTodo = (id) => api.delete(`/todos/${id}`);
