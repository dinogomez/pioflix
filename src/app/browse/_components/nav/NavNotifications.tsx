import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

export function NavNotifications() {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="relative p-2 hover:bg-white/10 rounded-full transition focus:outline-none">
                <Bell className="h-6 w-6" />
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
    );
} 