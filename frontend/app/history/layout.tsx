import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

export default function HistoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="relative bg-primary h-12 pt-2">
        <Link href="/rewards">
          <IoChevronBack className="absolute text-3xl top-2 left-1" />
        </Link>
        <h2 className="text-center text-2xl font-semibold">History</h2>
      </header>
      {children}
    </>
  );
}
