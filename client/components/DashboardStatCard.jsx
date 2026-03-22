export default function DashboardStatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <p className="text-sm uppercase tracking-wide text-gray-500">{title}</p>
      <h3 className="mt-3 text-3xl font-bold text-white">{value}</h3>
      {subtitle && <p className="mt-2 text-gray-400">{subtitle}</p>}
    </div>
  );
}