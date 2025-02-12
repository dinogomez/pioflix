"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <main className="min-h-screen bg-background pt-20">
            <div className="h-[calc(100vh-5rem)] w-full flex items-center justify-center">
                <Loader2 className="h-24 w-24 animate-spin text-red-800" />
            </div>
        </main>
    );
} 