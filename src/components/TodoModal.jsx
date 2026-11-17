import { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

export default function TodoModal({
  mode = "add",
  initialData,
  onSubmit,
  onClose,
}) {
  const [form, setForm] = useState(initialData ?? emptyForm);
  const [errors, setErrors] = useState({});

  const isAdd = mode === "add";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Judul wajib diisi";
    if (!form.deadline) err.deadline = "Deadline wajib diisi";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  };

  const input =
    "w-full rounded border border-blue-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded bg-white p-5 shadow-lg"
      >
        <h2 className="mb-4 text-center font-bold">
          {isAdd ? "Tambah Todo" : "Update Todo"}
        </h2>

        <label className="mb-1 block text-sm font-bold">Judul</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className={input}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-600">{errors.title}</p>
        )}

        <label className="mb-1 mt-3 block text-sm font-bold">Deskripsi</label>
        <textarea
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          className={input}
        />

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-bold">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={input}
            >
              <option value="to-do">to-do</option>
              <option value="in progress">in progress</option>
              <option value="done">done</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">Prioritas</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className={input}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
        </div>

        <label className="mb-1 mt-3 block text-sm font-bold">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className={input}
        />
        {errors.deadline && (
          <p className="mt-1 text-xs text-red-600">{errors.deadline}</p>
        )}

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded bg-red-600 py-2 text-sm text-white hover:bg-red-700"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex-1 rounded bg-blue-600 py-2 text-sm text-white hover:bg-blue-700"
          >
            {isAdd ? "Tambah" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}