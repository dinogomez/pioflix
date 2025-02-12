import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center p-4">
            <div className="flex flex-col gap-12">
                <h1 className="text-4xl sm:text-6xl font-bold mb-4">Lost your way?</h1>

                <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
                    Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
                </p>
            </div>

            <Link href="/">
                <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-2xl rounded-none px-12 py-6"
                >
                    Netflix Home
                </Button>
            </Link>
        </main>
    );
} 