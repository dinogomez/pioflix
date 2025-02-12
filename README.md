<div align="center">
  <img src="https://i.imgur.com/I5K1BoL.png" alt="Pioflix Screenshot" />
</div>

# PIOFLIX - IMDB CODING CHALLENGE

A modern, responsive movie and TV show discovery platform built with Next.js 15, TypeScript, and the TMDB API. This project was created as part of a coding challenge to demonstrate full-stack development capabilities.

## Features

- 🔍 Real-time search functionality with debouncing
- 👤 Multi-profile support with persistent state
- 📱 Fully responsive design
- ⚡ Server-side rendering for optimal performance
- 🎨 Modern UI with smooth transitions and loading states
- 🖼️ Intelligent image handling with fallbacks
- 🔒 Secure API handling through server-side routes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: nuqs (URL State)
- **Animation**: Framer Motion
- **UI Components**: shadcn / radix / pqoqubbw icons
- **API**: TMDB (The Movie Database)

## Getting Started

### Prerequisites

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```bash
TMDB_API_BASE_URL=https://api.themoviedb.org/3
TMDB_API_READ_ACCESS_TOKEN=your_access_token_here
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pioflix.git
cd pioflix
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and API handlers
- `/src/types` - TypeScript type definitions
- `/src/hooks` - Custom React hooks

## Implemented Stretch Goals

1. **Caching**

   - Implemented revalidation strategies for API responses
   - Optimized data fetching with Next.js cache

2. **Animations & Transitions**

   - Smooth page transitions using next-view-transitions
   - Animated transition with framer-motion
   - Loading states with animated skeletons
   - Hover effects on movie cards

3. **Responsive Design**

   > **_NOTE:_** For mobile responsiveness, avoid using Chrome DevTools. Instead view via local or deployed version in your mobile device.

   - Fully responsive layout from mobile to desktop
   - Adaptive navigation for different screen sizes
   - Optimized images with different sizes for various devices

4. **Additional Features**
   - Multi-profile support (Cosmetic)
   - Separate browsing for Movies and TV Shows
   - Hero sections with random featured content
   - Detailed view for both movies and TV shows

## Security Considerations

- All API calls are made server-side to protect API keys
- Image domains are strictly configured in Next.js config
- Type-safe API routes with proper error handling
- Environment variables are properly handled

## Performance Optimizations

- Debounced search queries
- Lazy loading of images
- Optimized image loading with blur placeholders
- Server-side rendering for initial page loads
- Efficient data fetching with parallel requests
- Added lazy loading to images

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [TMDB API Documentation](https://developers.themoviedb.org/3) - explore the TMDB API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Limitations & Future Improvements

- Add authentication system
- Implement favorites/watchlist functionality
- Add more detailed cast information
- Implement video trailer playback
- Add user reviews and ratings

## Contributing

This project was created as part of a coding challenge, but feel free to fork and modify for your own use.

## License

This project is open-source and available under the MIT License.
