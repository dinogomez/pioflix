import { Navbar } from "./_components/navbar";

export default function BrowseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
      </main>
    </>
  );
}
