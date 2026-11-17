import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { dummyTodos } from "./data/dummyTodos";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import Toast from "./components/Toast";

export default function App() {
  const [todos, setTodos] = useState(dummyTodos);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // CREATE
  const addTodo = (data) => {
    const newId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    setTodos((prev) => [...prev, { ...data, id: newId }]);
    showToast("Tugas berhasil ditambahkan");
  };

  // UPDATE
  const updateTodo = (id, data) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data, id } : t))
    );
    showToast("Tugas berhasil diperbarui");
  };

  // DELETE
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    showToast("Tugas berhasil dihapus", "error");
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <TodoListPage
              todos={todos}
              onAdd={addTodo}
              onDelete={deleteTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={<TodoDetailPage todos={todos} onUpdate={updateTodo} />}
        />
        <Route
          path="*"
          element={
            <div className="p-8 text-center">
              <p className="mb-4">Halaman tidak ditemukan.</p>
              <Link to="/" className="text-blue-600 underline">
                Kembali ke beranda
              </Link>
            </div>
          }
        />
      </Routes>
      <Toast toast={toast} />
    </>
  );
}