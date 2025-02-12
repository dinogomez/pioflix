import { redirect } from 'next/navigation';

export default async function LoadingRedirect({
    searchParams,
}: {
    searchParams: { profile: string };
}) {
    // Add artificial delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Redirect to the actual browse page
    redirect(`/browse?profile=${searchParams.profile}`);
} 