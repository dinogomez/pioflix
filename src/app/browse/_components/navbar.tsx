"use client";

import { profiles } from "@/app/_data/profiles";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";

export function Navbar() {
    const [profileId, setProfileId] = useQueryState(
        "profile",
        parseAsInteger.withDefault(1)
    );

    const currentProfile = profiles.find((p) => p.id === profileId) || profiles[0];
    const otherProfiles = profiles.filter((p) => p.id !== currentProfile.id);


    return (
        <nav className="fixed top-0 w-full bg-transparent z-50">
            <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
                <div className="flex items-center gap-8">
                    <Link href="/browse" className="flex items-center">
                        <div className="relative h-7 w-[92px]">
                            <Image
                                src="/pioflix.png"
                                alt="Pioflix"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/browse"
                            className="text-sm text-foreground hover:text-foreground/80 transition"
                        >
                            Home
                        </Link>
                        <Link
                            href="/browse/tv"
                            className="text-sm text-foreground hover:text-foreground/80 transition"
                        >
                            TV Shows
                        </Link>
                        <Link
                            href="/browse/movies"
                            className="text-sm text-foreground hover:text-foreground/80 transition"
                        >
                            Movies
                        </Link>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                        <div className="relative w-8 h-8 overflow-hidden rounded">
                            <Image
                                src={currentProfile.image}
                                alt={currentProfile.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {otherProfiles.map((profile) => (
                            <DropdownMenuItem
                                key={profile.id}
                                onClick={() => setProfileId(profile.id)}
                                className="cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative w-8 h-8 overflow-hidden rounded">
                                        <Image
                                            src={profile.image}
                                            alt={profile.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-sm">{profile.name}</span>
                                </div>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/" className="cursor-pointer">
                                Manage Profiles
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}
