

export default function EmptyState({ title = "No data found", subtitle = "" }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-center">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      {subtitle && <p className="mt-2 text-gray-400">{subtitle}</p>}
    </div>
  );
}