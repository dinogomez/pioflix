"use client"

import { profiles } from "@/lib/profiles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageFallback from "./_components/ImageFallback";
import Loading from "./loading";

export default function ProfileSelection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileClick = (profileId: string) => {
    setIsLoading(true);
    router.push(`/?profile=${profileId}`);
    setTimeout(() => {
      router.push(`/browse/?profile=${profileId}`);
    }, 1600);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-12">Who&apos;s watching?</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <button
            key={profile.id.toString()}
            className="group flex flex-col items-center gap-3"
            onClick={() => handleProfileClick(profile.id.toString())}
          >
            <div className="relative w-40 h-40 overflow-hidden rounded-lg group-hover:ring-2 ring-white transition-all">
              <ImageFallback
                src={profile.image}
                alt={profile.name ? profile.name : "profile avatar"}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-gray-400 group-hover:text-white transition-colors">
              {profile.name}
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
