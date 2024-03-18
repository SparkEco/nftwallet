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
  title: "Impact Explorer | Home",
  description: "An Impactscribe product",
  applicationName: "Impact Explorer",
  generator:
    "defi, impactscribe, nfts, marketplace, smart contracts, impact explorer, graph",
  publisher: "Vercel",
  creator: "The Impactscribe web team",
  robots: { googleBot: { index: true, follow: true } },
  authors: [
    { name: "Michael Christwin", url: "https://github.com/michaelchristwin" },
    { name: "I. Christwin", url: "https://github.com/ichristwin" },
  ],
  openGraph: {
    type: "website",
    title: "Impact Explorer",
    countryName: "United States",
    url: "https://impact-explorer.vercel.app/",
    siteName: "Impact Explorer",
    locale: "en-US",
    description: "An Impactscribe product",
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
