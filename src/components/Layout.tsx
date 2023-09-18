import WalletProvider from "../providers/WalletProvider";
import Footer from "./Footer";
import Navbar from "./Navbar";
import React from "react";

interface ParentComponentProps {
  children: React.ReactNode;
}

function Layout({ children }: ParentComponentProps) {
  return (
    <div className="layout">
      <Navbar />
      <WalletProvider>{children}</WalletProvider>
      <Footer />
    </div>
  );
}

export default Layout;
