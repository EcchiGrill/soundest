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
  title: "Soundest",
  description: "Listen to your favorite bangers everywhere!",
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
          <ToastContainer />
        </ModalProvider>
      </body>
    </html>
  );
}
