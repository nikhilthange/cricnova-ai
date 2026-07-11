import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="mb-6 text-lg text-gray-400">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-white px-6 py-3 font-semibold text-black"
      >
        Go Home
      </Link>
    </main>
  );
}