import Loader from "@/components/ui/loader";
import type { Metadata } from "next";
import { ViewTransitions } from 'next-view-transitions';
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pioflix",
  description: "IMDB-style movie search app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        >
          <NuqsAdapter>
            <Suspense fallback={<Loader />}>
              {children}
            </Suspense>
          </NuqsAdapter>
        </body>
      </html>
    </ViewTransitions>

  );
}
