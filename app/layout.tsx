// "use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import Head from "next/head";
const inter = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata = {
  title: "Proximity",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // console.log(location.href);

  return (
    <html lang="en">
      <body className={inter.className + "bg-sec"}>
        {<Navbar />}
        {children}
      </body>
    </html>
  );
}
