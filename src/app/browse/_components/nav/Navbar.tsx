"use client";

import ImageFallback from "@/app/_components/ImageFallback";
import { useDebounce } from "@/hooks/use-debounce";
import { profiles } from "@/lib/profiles";
import { Link } from 'next-view-transitions';
import { usePathname, useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from "nuqs";
import { SetStateAction, useEffect, useState } from "react";
import { NavLinks } from "./NavLinks";
import { NavNotifications } from "./NavNotifications";
import { NavProfile } from "./NavProfile";
import { NavSearch } from "./NavSearch";


export function Navbar() {
    const [profileId, setProfileId] = useQueryState(
        "profile",
        parseAsInteger.withDefault(1)
    );
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useQueryState('q')
    const router = useRouter()
    const debouncedSearch = useDebounce(searchQuery, 500)
    const pathname = usePathname();

    const currentProfile = profiles.find((p) => p.id === profileId) || profiles[0];
    const otherProfiles = profiles.filter((p) => p.id !== currentProfile.id);

    // Create a wrapper function that matches the expected type
    const handleProfileChange = (value: SetStateAction<number | null>) => {
        // If value is a function, call it with the current profileId
        const newValue = typeof value === 'function' ? value(profileId) : value;
        return setProfileId(newValue).then(() => newValue);
    };

    useEffect(() => {
        if (debouncedSearch) {
            router.push(`/browse/search?q=${debouncedSearch}`)
        }
    }, [debouncedSearch, router])

    return (
        <nav className="fixed top-0 w-full bg-background z-50 py-4">
            <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 sm:gap-8">
                    <Link href="/browse" className="flex items-center">
                        <div className="relative h-6 w-[80px] sm:h-8 sm:w-[105px]">
                            <ImageFallback
                                src="/pioflix.png"
                                alt="Pioflix"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                    <NavLinks pathname={pathname} profileId={profileId} />
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <NavSearch
                        isSearchOpen={isSearchOpen}
                        setIsSearchOpen={setIsSearchOpen}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <NavNotifications />
                    <NavProfile
                        currentProfile={currentProfile}
                        otherProfiles={otherProfiles}
                        setProfileId={handleProfileChange}
                        router={router}
                    />
                </div>
            </div>
        </nav>
    );
} 