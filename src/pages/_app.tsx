import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="flex flex-col h-screen">
        <Navbar/>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Component {...pageProps} />  
        </div>
        <Footer/>
      </div>
    </AuthProvider>
  );
}
