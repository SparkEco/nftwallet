import "../globals.css";
import type { Metadata } from "next";
import local from "next/font/local";
import WalletProvider from "@/providers/walletProvider";
import { Toaster } from "react-hot-toast";

const font = local({
  src: "../../components/dmsans/DMSans-Regular.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Impact Explorer | Dashboard",
  applicationName: "Impact Explorer",
  description: "",
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

          <div>{children}</div>
        </WalletProvider>
      </body>
    </html>
  );
}
