"use client";
import Image from "next/image";
import React from "react";
import Back from "../../public/back.svg";
import { useRouter } from "next/navigation";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="bg-prim w-screen min-h-screen p-10 px-5 py-8 flex justify-center">
      <h1 className="absolute text-xl font-bold text-sec flex cursor-pointer top-8 left-8" onClick={() => router.back()}>
        <Image priority src={Back} alt="Back arrow" height={25}></Image>Back
      </h1>
      {children}
    </div>
  );
}
