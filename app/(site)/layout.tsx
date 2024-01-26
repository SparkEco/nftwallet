import "../globals.css";
import type { Metadata } from "next";
import local from "next/font/local";
import WalletProvider from "@/providers/walletProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const font = local({
  src: "../../components/dmsans/DMSans-Regular.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Impact Explorer",
  description: "An ImpactScribe product",
  openGraph: {
    type: "website",
    title: "Impact Explorer",
    url: "https://impact-explorer.vercel.app/",
    description: "An ImpactScribe product",
    images: [
      {
        url: "https://bafybeicoc7mqxu2fb5v3bmy2ceikibtolaywnh247dbwshbvfj4fzomaiy.ipfs.nftstorage.link/",
      },
    ],
  },
};

interface RootProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootProps) {
  return (
    <html lang="en-US">
      <body className={`${font.className}`}>
        <WalletProvider>
          <Toaster />
          <Navbar />
          <div className="mt-[40px]">{children}</div>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}
