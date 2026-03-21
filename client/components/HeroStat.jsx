export default function HeroStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 px-6 py-5 text-center">
      <p className="text-sm uppercase tracking-wide text-gray-500">{label}</p>
      <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
    </div>
  );
}