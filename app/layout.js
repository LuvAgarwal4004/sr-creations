import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { CartProvider } from "@/context/CartContext";
import RouteLoader from "@/components/RouteLoader";
// import { CheckoutProvider } from "@/context/CheckoutContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SR Creations",
  description: "Get your style up!",
};

export default function RootLayout({ children }) {
  
   
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>

          <CartProvider>
            <RouteLoader>
              {/* <CheckoutProvider> */}
                

        <Navbar/>
        <div className="min-h-screen">
      
        {children}
            
        </div>
        <Footer/>
              {/* </CheckoutProvider> */}
            </RouteLoader>
          </CartProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
