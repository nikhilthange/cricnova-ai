export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-white" />
        <p className="text-lg text-gray-300">Loading match details...</p>
      </div>
    </main>
  );
}