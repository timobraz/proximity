"use client";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import CardScroll from "./components/sections/CardScroll";
import Footer from "./components/sections/Footer";
import Hero from "./components/sections/Hero";
import ShortAbout from "./components/sections/ShortAbout";
import ToSell from "./components/sections/ToSell";

export default function Home() {
  return (
    <main className=" bg-prim snap-y snap-mandatory h-screen w-screen overflow-y-scroll">
      <Head>
        <title>Proximity</title>
      </Head>
      <AnimatePresence>
        <Hero />
        <ShortAbout />
        <ToSell />
        <CardScroll />
      </AnimatePresence>
      <Footer></Footer>
    </main>
  );
}
