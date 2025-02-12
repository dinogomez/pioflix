// app/page.tsx
import { profiles } from "@/lib/profiles";
import { Link } from 'next-view-transitions';
import ImageFallback from "./_components/ImageFallback";



export default async function ProfileSelection() {


  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-12">Who&apos;s watching?</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <Link
            href={`/browse/?profile=${profile.id}`}
            key={profile.id}
            className="group flex flex-col items-center gap-3"
          >
            <div className="relative w-40 h-40 overflow-hidden rounded-lg group-hover:ring-4 ring-white transition-all">
              <ImageFallback
                src={profile.image}
                alt={profile.name ? profile.name : "profile avatar"}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-gray-400 group-hover:text-white transition-colors">
              {profile.name}
            </span>
          </Link>
        ))}
      </div>

    </main>
  )
}
