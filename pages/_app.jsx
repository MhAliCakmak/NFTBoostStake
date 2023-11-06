import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { Navbar, Footer } from "../components";
import { ContractProvider } from "../context/ContractContext";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <ContractProvider>
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Navbar />
          <div className="pt-65">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
        <Script
          src="https://kit.fontawesome.com/fb64a6da9d.js"
          crossOrigin="anonymous"
        />
      </ThemeProvider>
    </ContractProvider>
  );
}

export default App;
