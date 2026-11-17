import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import TodoModal from "../components/TodoModal";
import ConfirmDialog from "../components/ConfirmDialog";

export default function TodoListPage({ todos, onAdd, onDelete }) {
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAdd = (data) => {
    onAdd(data);
    setShowAdd(false);
  };

  const handleConfirmDelete = () => {
    onDelete(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Tambah Todo
        </button>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th className="py-2 font-bold">Judul</th>
            <th className="py-2 font-bold">Status</th>
            <th className="py-2 font-bold">Prioritas</th>
            <th className="py-2 font-bold">Deadline</th>
            <th className="py-2 text-center font-bold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 && (
            <tr>
              <td colSpan={5} className="py-10 text-center text-gray-500">
                Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas baru.
              </td>
            </tr>
          )}
          {todos.map((todo) => (
            <tr key={todo.id} className="border-b border-gray-200">
              <td className="py-3">
                <div className="max-w-[220px] truncate">{todo.title}</div>
              </td>
              <td className="py-3">{todo.status}</td>
              <td className="py-3">{todo.priority}</td>
              <td className="py-3">{todo.deadline}</td>
              <td className="py-3">
                <div className="flex justify-center gap-1">
                  <Link
                    to={`/todo/${todo.id}`}
                    title="Lihat detail"
                    className="rounded bg-blue-600 p-1.5 text-white hover:bg-blue-700"
                  >
                    <Eye size={14} />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(todo)}
                    title="Hapus"
                    className="rounded bg-red-600 p-1.5 text-white hover:bg-red-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdd && (
        <TodoModal
          mode="add"
          onSubmit={handleAdd}
          onClose={() => setShowAdd(false)}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Yakin ingin menghapus tugas "${deleteTarget.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}