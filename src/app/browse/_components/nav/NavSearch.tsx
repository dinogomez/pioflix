import { SearchIcon, SearchIconHandle } from "@/components/icons/search-icon";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface NavSearchProps {
    isSearchOpen: boolean;
    setIsSearchOpen: (value: boolean) => void;
    searchQuery: string | null;
    setSearchQuery: (value: string | null) => void;
}

export function NavSearch({ isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery }: NavSearchProps) {
    const searchRef = useRef<HTMLDivElement>(null);
    const searchIconRef = useRef<SearchIconHandle>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsSearchOpen]);

    if (isSearchOpen) {
        searchIconRef.current?.stopAnimation();
    }

    return (
        <div className="relative w-10" ref={searchRef}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "285px", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute right-10"
                        >
                            <div className="relative">
                                <SearchIcon
                                    ref={searchIconRef}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 !p-0 hover:!bg-transparent"
                                />
                                <Input
                                    className="w-full bg-neutral-900 sm:bg-neutral-900/90 border-neutral-700 text-white placeholder:text-neutral-400 focus-visible:ring-neutral-100 pl-9 rounded-none"
                                    placeholder="Titles, Movies, TV Shows"
                                    value={searchQuery || ''}
                                    autoFocus
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {isSearchOpen ? (
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="p-2 rounded-full transition !bg-transparent"
                    >
                        <X className="h-6 w-6" />
                    </button>
                ) : (
                    <SearchIcon className="hover:bg-transparent" onClick={() => setIsSearchOpen(true)} />
                )}
            </div>
        </div>
    );
} 