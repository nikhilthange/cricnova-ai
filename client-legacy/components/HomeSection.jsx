export default function HomeSection({ title, subtitle, children }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        {subtitle && <p className="mt-2 text-gray-400">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}