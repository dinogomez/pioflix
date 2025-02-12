"use client";

import { Loader2 } from "lucide-react";

export default function Loader() {
    return (
        <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center">
            <Loader2 className="h-24 w-24 animate-spin text-red-800" />
        </div>
    );
}