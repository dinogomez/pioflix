import { SearchIcon } from "@/components/icons/search-icon";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRef } from "react";

interface NavSearchProps {
    isSearchOpen: boolean;
    setIsSearchOpen: (value: boolean) => void;
    searchQuery: string | null;
    setSearchQuery: (value: string | null) => void;
}

export function NavSearch({ isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery }: NavSearchProps) {
    const searchRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative" ref={searchRef}>
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "285px", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2"
                    >
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 !p-0 hover:!bg-transparent" />
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
                    className="p-2 hover:bg-white/10 rounded-full transition"
                >
                    <X className="h-6 w-6" />
                </button>
            ) : (
                <SearchIcon onClick={() => setIsSearchOpen(true)} />
            )}
        </div>
    );
} 