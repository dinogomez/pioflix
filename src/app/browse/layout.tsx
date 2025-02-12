import { Navbar } from "./_components/navbar";

export default function BrowseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="h-screen scrollbar-gutter-stable pt-14">
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
      </div>
    </>
  );
}
