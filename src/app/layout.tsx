import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { ModalProvider } from "@/components/provider/modal-provider";
import ModalContainer from "@/components/modals/modal-container";

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
          {children}
          <ModalContainer />
          <ToastContainer />
        </ModalProvider>
      </body>
    </html>
  );
}
