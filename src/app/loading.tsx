"use client";

import { profiles } from "@/lib/profiles";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useQueryState } from "nuqs";

export default function Loading() {
    const [profileId] = useQueryState("profile");

    const selectedProfile = profiles.find((p) => p.id === Number(profileId));

    return (
        <div className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center">
            <Loader2 className="h-40 w-40 sm:h-60 sm:w-60 animate-spin text-red-800" />
            {profileId && selectedProfile?.image && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src={selectedProfile.image}
                        alt={`${selectedProfile.name || "User"}'s Avatar`}
                        width={80}
                        height={80}
                        className="rounded"
                        priority
                    />
                </div>
            )}
        </div>
    );
}
