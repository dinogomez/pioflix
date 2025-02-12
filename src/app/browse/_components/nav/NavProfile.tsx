import ImageFallback from "@/app/_components/ImageFallback";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Profile } from "@/types/profile";
import { ChevronDown } from "lucide-react";
import { Link } from "next-view-transitions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetStateAction } from "react";

interface NavProfileProps {
    currentProfile: Profile;
    otherProfiles: Profile[];
    setProfileId: (value: SetStateAction<number | null>) => Promise<number | null>;
    router: AppRouterInstance;
}

export function NavProfile({ currentProfile, otherProfiles, setProfileId, router }: NavProfileProps) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none pl-1">
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 overflow-hidden rounded">
                    <ImageFallback
                        src={currentProfile.image}
                        alt={currentProfile.name ? currentProfile.name : "profile avatar"}
                        fill
                        className="object-cover"
                    />
                </div>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48" sideOffset={8}>
                {otherProfiles.map((profile) => (
                    <DropdownMenuItem
                        key={profile.id}
                        onClick={async () => {
                            await setProfileId(profile.id);
                            router.push(`/browse?profile=${profile.id}`);
                        }}
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
    );
} 