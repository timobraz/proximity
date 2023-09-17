"use client";
import Link from "next/link";
import Logo from "./Logo";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
export default function Navbar() {
  console.log(window.location.href);

  return (
    usePathname() == "/" && (
      <motion.nav
        className="flex min-h-[7rem] bg-transparent items-center justify-between xl:px-12 px-4  w-full fixed z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div className="flex h-full gap-1 items-center">
          {/* <Logo tw={"hidden lg:inline-block"}></Logo> */}
          <h1 className="font-extrabold text-sec lg:text-4xl text-3xl relative bottom-1 tracking-tighter">Proximity</h1>
        </motion.div>
        <div className="md:flex flex-row xl:gap-10 gap-4 hidden lg:text-2xl text-xl font-medium text-sec  ">
          <span className="navlink cursor-pointer transition-all hover:text-acc duration-300 ease-in-out h-full">Explore</span>
          <span className="navlink cursor-pointer transition-all hover:text-acc duration-300 ease-in-out">About</span>
          <span className="navlink cursor-pointer transition-all hover:text-acc duration-300 ease-in-out">Contact</span>
        </div>
        <Link className="btn-rd-blue" href="/register">
          Start Matching
        </Link>
      </motion.nav>
    )
  );
}
