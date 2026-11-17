export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-2 text-center font-bold">Konfirmasi Hapus</h2>
        <p className="mb-6 text-center text-sm text-gray-700">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 rounded bg-gray-500 py-2 text-sm text-white hover:bg-gray-600"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded bg-red-600 py-2 text-sm text-white hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}