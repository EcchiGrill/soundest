import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { ModalProvider } from "@/components/provider/modal-provider";
import ModalContainer from "@/components/modals/modal-container";
import Header from "@/components/common/header";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import FilterPanel from "@/components/common/filter-panel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
  title: "Soundest",
  description: "Listen to your favorite bangers everywhere!",
  creator: "Dmytro Oborskyi",
  category: "Music",
  keywords: ["soundest", "music", "sound library"],
  robots: { index: true, follow: true, nocache: true },
  openGraph: {
    title: "Soundest",
    description: "Listen to your favorite bangers everywhere!",
    type: "website",
    url: process.env.NEXT_PUBLIC_URL,
    images: [
      {
        url: process.env.NEXT_PUBLIC_URL + "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Soundest",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ModalProvider>
          <Header />
          <main className="p-8">
            <h2 className="text-2xl text-primary font-semibold">
              Your music library
            </h2>
            <Suspense fallback={<Skeleton className="w-full h-[2rem]" />}>
              <FilterPanel />
            </Suspense>
            {children}
          </main>
          <ModalContainer />
          <ToastContainer data-testid="toast-container" />
        </ModalProvider>
      </body>
    </html>
  );
}
