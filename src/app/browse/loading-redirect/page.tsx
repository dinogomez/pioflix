import { redirect } from 'next/navigation';
import { SearchParams } from 'nuqs/server';
import { loadProfileParams } from '../_components/_params/ProfileParams';

type PageProps = {
    searchParams: { [key: string]: string | string[] | undefined }
    params: { [key: string]: string | string[] }
}

export default async function LoadingRedirect({ searchParams }: PageProps) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { profile } = await loadProfileParams(searchParams as SearchParams)

    redirect(`/browse?profile=${profile}`);
} 