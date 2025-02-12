import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Link } from "next-view-transitions";

interface NavLinksProps {
    pathname: string;
    profileId: number;
}

export function NavLinks({ pathname, profileId }: NavLinksProps) {
    const profileQuery = profileId !== 1 ? `?profile=${profileId}` : '';

    return (
        <>
            <div className="hidden md:flex items-center gap-4">
                <Link
                    href={`/browse${profileQuery}`}
                    className={cn(
                        "text-md transition",
                        pathname === "/browse"
                            ? "text-white"
                            : "text-neutral-400 hover:text-neutral-500"
                    )}
                >
                    Home
                </Link>
                <Link
                    href={`/browse/tv${profileQuery}`}
                    className={cn(
                        "text-md transition",
                        pathname === "/browse/tv"
                            ? "text-white"
                            : "text-neutral-400 hover:text-neutral-500"
                    )}
                >
                    TV Shows
                </Link>
                <Link
                    href={`/browse/movie${profileQuery}`}
                    className={cn(
                        "text-md transition",
                        pathname === "/browse/movie"
                            ? "text-white"
                            : "text-neutral-400 hover:text-neutral-500"
                    )}
                >
                    Movies
                </Link>

            </div>
            <div className="md:hidden">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <div className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                            <span>Browse</span>
                            <ChevronDown className="w-4 h-4 fill-current" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-black border border-neutral-700">
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/browse${profileQuery}`}
                                className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                                Home
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/browse/tv${profileQuery}`}
                                className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                                TV Shows
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/browse/movie${profileQuery}`}
                                className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            >
                                Movies
                            </Link>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
} 