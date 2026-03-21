export default function ErrorState({ message = "Something went wrong" }) {
  return (
    <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6 text-center">
      <h3 className="text-xl font-semibold text-red-300">Error</h3>
      <p className="mt-2 text-red-200">{message}</p>
    </div>
  );
}