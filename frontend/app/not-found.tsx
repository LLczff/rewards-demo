import Link from "next/link";

function NotFound() {
  return (
    <main className="main-container items-center justify-center bg-white text-primary gap-2">
      <h1 className="text-6xl font-extrabold">404</h1>
      <h2 className="text-xl font-medium mb-3">Look like you're lost.</h2>
      <Link href="/" className="p-3 text-white bg-primary rounded-lg">
        Back to Start
      </Link>
    </main>
  );
}

export default NotFound;
