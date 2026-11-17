export default function Toast({ toast }) {
  if (!toast) return null;
  const color = toast.type === "error" ? "bg-red-600" : "bg-green-600";
  return (
    <div
      className={`fixed bottom-6 right-6 z-[60] rounded px-4 py-3 text-sm text-white shadow-lg ${color}`}
    >
      {toast.message}
    </div>
  );
}