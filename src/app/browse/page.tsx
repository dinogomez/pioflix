"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { Navbar } from "./_components/navbar";

export default function BrowsePage() {
  const [profile] = useQueryState("profile", parseAsInteger.withDefault(1));

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Your browse page content */}
          <div>Current Profile ID: {profile}</div>
        </div>
      </main>
    </>
  );
}
