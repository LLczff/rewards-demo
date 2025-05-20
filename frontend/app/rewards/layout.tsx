import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { TbHistory } from "react-icons/tb";

export default function RewardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex justify-between bg-primary pl-1 pr-2 py-2">
        <Link href="/">
          <IoChevronBack className="text-3xl" />
        </Link>
        <Link
          href="/history"
          className="h-fit p-1 aspect-square bg-white rounded-full"
        >
          <TbHistory className="text-2xl text-primary" />
        </Link>
      </header>
      {children}
    </>
  );
}
