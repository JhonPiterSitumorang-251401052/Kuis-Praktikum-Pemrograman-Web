import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import TodoModal from "../components/TodoModal";

export default function TodoDetailPage({ todos, onUpdate }) {
  const { id } = useParams();
  const [showEdit, setShowEdit] = useState(false);

  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">Tugas tidak ditemukan.</p>
        <Link to="/" className="text-blue-600 underline">
          Kembali
        </Link>
      </div>
    );
  }

  const handleUpdate = (data) => {
    onUpdate(todo.id, data);
    setShowEdit(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="grid w-full max-w-2xl grid-cols-1 gap-6 rounded-lg border border-gray-200 p-6 shadow-sm sm:grid-cols-2">
        <div>
          <h3 className="font-bold">Judul</h3>
          <p className="mb-3 text-sm">{todo.title}</p>
          <h3 className="font-bold">Deskripsi</h3>
          <div className="min-h-24 whitespace-pre-wrap rounded border border-gray-200 p-2 text-sm">
            {todo.description || "-"}
          </div>
        </div>

        <div>
          <h3 className="font-bold">Status</h3>
          <p className="mb-3 text-sm">{todo.status}</p>
          <h3 className="font-bold">Prioritas</h3>
          <p className="mb-3 text-sm">{todo.priority}</p>
          <h3 className="font-bold">Deadline</h3>
          <p className="mb-4 text-sm">{todo.deadline}</p>
          <div className="flex gap-2">
            <Link
              to="/"
              className="rounded bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700"
            >
              Kembali
            </Link>
            <button
              onClick={() => setShowEdit(true)}
              className="rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <TodoModal
          mode="edit"
          initialData={todo}
          onSubmit={handleUpdate}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}