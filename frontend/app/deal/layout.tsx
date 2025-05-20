import GoBack from "@/components/deal/GoBack";

export default function DealLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="relative bg-primary h-12 pt-2 ">
        <GoBack />
        <h2 className="text-center text-2xl font-semibold">Deal</h2>
      </header>
      {children}
    </>
  );
}
