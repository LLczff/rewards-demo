import Link from "next/link";

function NotFound() {
  return (
    <main className="main-container items-center gap-2">
      <h1 className="text-6xl font-extrabold">404</h1>
      <h2 className="text-xl font-medium mb-3">Look like you're lost.</h2>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </main>
  );
}

export default NotFound;
