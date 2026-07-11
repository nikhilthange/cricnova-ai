export default function PageContainer({ title, children }) {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      {title && <h1 className="mb-8 text-4xl font-bold">{title}</h1>}
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  );
}