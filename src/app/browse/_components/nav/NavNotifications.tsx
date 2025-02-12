import { BellIcon } from "@/components/icons/bell-icon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { calculateDaysLeft } from "@/lib/utils";
import Image from "next/image";

export function NavNotifications() {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <div className="relative">
                    <BellIcon className="hover:!bg-transparent" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 rounded-full text-[10px] flex items-center justify-center text-white">
                        1
                    </span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuItem className="cursor-default">
                    <div className="flex gap-3 items-center">
                        <div className="relative h-12 w-12 rounded-sm overflow-hidden">
                            <Image
                                src="https://media.licdn.com/dms/image/v2/D560BAQHnFUq3_odBrw/company-logo_200_200/company-logo_200_200/0/1719255941180/pioneer_dev_ai_logo?e=1747267200&v=beta&t=X4W3hCUF1r8J0SBbsN-P_OfmSEF8brSpg1HX3-8gsME"
                                alt="New Application"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-medium">New Application </p>
                            <p className="text-xs text-neutral-400">
                                Paul Gomez applied for a job! 🚀
                            </p>
                            <p className="text-xs text-neutral-400">
                                {calculateDaysLeft('2025-02-09')}
                            </p>
                        </div>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 