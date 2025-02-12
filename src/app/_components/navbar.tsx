"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { profiles } from "@/lib/profiles";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronDown, Search, X } from "lucide-react";
import { Link } from 'next-view-transitions';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import ImageFallback from "./ImageFallback";

export function Navbar() {

    const [profileId, setProfileId] = useQueryState(
        "profile",
        parseAsInteger.withDefault(1)
    );
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useQueryState('q')
    const router = useRouter()
    const searchRef = useRef<HTMLDivElement>(null);
    const debouncedSearch = useDebounce(searchQuery, 500)

    const currentProfile = profiles.find((p) => p.id === profileId) || profiles[0];
    const otherProfiles = profiles.filter((p) => p.id !== currentProfile.id);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (debouncedSearch) {
            router.push(`/browse/search?q=${debouncedSearch}`)
        }
    }, [debouncedSearch, router])

    return (
        <nav className="fixed top-0 w-full bg-background z-50 py-2">
            <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
                <div className="flex items-center gap-8">
                    <Link href="/browse" className="flex items-center">
                        <div className="relative h-7 w-[92px]">
                            <ImageFallback
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

                <div className="flex items-center gap-4">
                    <div className="relative" ref={searchRef}>
                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "300px", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2"
                                >
                                    <Input
                                        className="w-full bg-neutral-900/90 border-neutral-700 text-white placeholder:text-neutral-400 focus-visible:ring-neutral-100"
                                        placeholder="Titles, Movies, TV Shows"
                                        value={searchQuery || ''}
                                        autoFocus
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 hover:bg-white/10 rounded-full transition"
                        >
                            {isSearchOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Search className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="relative p-2 hover:bg-white/10 rounded-full transition focus:outline-none ">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-4 w-4 bg-red-600 rounded-full text-[10px] flex items-center justify-center">
                                1
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-72">
                            <DropdownMenuItem className="cursor-default">
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">Hope you like it - Paul</p>
                                    <p className="text-xs text-neutral-400">
                                        Just now
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none pl-1 ">
                            <div className="relative w-8 h-8 overflow-hidden rounded">
                                <ImageFallback
                                    src={currentProfile.image}
                                    alt={currentProfile.name ? currentProfile.name : "profile avatar"}
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
                                            <ImageFallback
                                                src={profile.image}
                                                alt={profile.name ? profile.name : "profile avatar"}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="text-sm">
                                            {profile.name}
                                        </span>
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
            </div>
        </nav>
    );
}
