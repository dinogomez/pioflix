import { redirect } from 'next/navigation';
import { SearchParams } from 'nuqs/server';
import { loadProfileParams } from '../_components/_params/ProfileParams';

type PageProps = {
    profileParams: Promise<SearchParams>
}

export default async function LoadingRedirect({ profileParams }: PageProps) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { profile } = await loadProfileParams(profileParams)

    redirect(`/browse?profile=${profile}`);
} 