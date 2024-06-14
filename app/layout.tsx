import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Web3Modal from "@/utils/WalletProvider";
import Navbar from "@/components/Navbar";

const DmSans = DM_Sans({
  weight: ["100", "300", "400", "200", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Impact Explorer",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={DmSans.className}>
        <Navbar />
        <Web3Modal>
          <div className={`w-full h-[100%] mt-[10px]`}>{children}</div>
        </Web3Modal>
      </body>
    </html>
  );
}
