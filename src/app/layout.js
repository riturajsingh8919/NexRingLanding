import { Outfit } from "next/font/google";
import { Inria_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const inriaSerif = Inria_Serif({
  variable: "--font-inria-serif",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "NxRing - Smart Health Ring",
  description: "Annual tests covering 150+ biomarkers, integrated with continuous biometric data to predict, prevent and protect.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfitSans.variable} ${inriaSerif.variable} antialiased`}
      >
        <Header />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
