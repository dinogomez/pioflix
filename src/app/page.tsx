// app/page.tsx
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { profiles } from './_data/profiles'



export default function ProfileSelection() {
  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-12">Who's watching?</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <Link
            href={`/browse?profile=${profile.id}`}
            key={profile.id}
            className="group flex flex-col items-center gap-3"
          >
            <div className="relative w-32 h-32 overflow-hidden rounded-lg group-hover:ring-4 ring-white transition-all">
              <Image
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
