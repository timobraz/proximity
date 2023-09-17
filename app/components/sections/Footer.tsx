import Link from "next/link";
import React from "react";
import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className="flex h-96 gap-4 snap-start bg-sec2 p-10 border-t-[1px] border-sec">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <Logo tw={""}></Logo>
          <Link href="/" className="font-extrabold text-acc lg:text-4xl text-3xl relative bottom-1 tracking-tighter">
            investa
          </Link>
        </div>
        <Link
          href={"/register"}
          className="text-2xl font-semibold text-sec hover:text-lightacc transition-[color,transform] cursor-pointer hover:translate-x-1"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="text-2xl font-semibold text-sec hover:text-lightacc transition-[color,transform] cursor-pointer hover:translate-x-1"
        >
          Login
        </Link>
        <Link
          href="/seller"
          className="text-2xl font-semibold text-sec hover:text-lightacc transition-[color,transform] cursor-pointer hover:translate-x-1"
        >
          Become a Seller
        </Link>

        <Link
          href="/about"
          className="text-2xl font-semibold text-sec hover:text-lightacc transition-[color,transform] cursor-pointer hover:translate-x-1"
        >
          About
        </Link>
      </div>
    </footer>
  );
}
