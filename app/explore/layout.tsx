import "../globals.css";
import type { Metadata } from "next";
import local from "next/font/local";
import WalletProvider from "@/providers/walletProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const font = local({
  src: "../../components/dmsans/DMSans-Regular.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Impact Explorer | Explorer",
  applicationName: "Impact Explorer",
  description: "A marketplace for impact certs",
};

interface RootProps {
  children: React.ReactNode;
}

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/67428/impactscribe/version/latest",
  cache: new InMemoryCache(),
});

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
