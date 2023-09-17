import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Home from "../../public/house.svg";
interface CardI {
  name?: string;
  location?: string;
  properties?: number;
}
export default function Card({ name, location, properties }: CardI) {
  return (
    <motion.div className="card bg-sec flex rounded-lg min-w-[18rem] flex-col shadow-lg ring-4  ring-lightacc hover:rotate-1 hover:scale-105 duration-300 cursor-pointer">
      <Image src="/investor.jpeg" alt="investor" width="400" height="400" className="w-full aspect-square rounded-t-lg "></Image>
      <motion.div className="flex flex-col gap-1 p-4">
        <h1 className="text-xl font-semibold text-acc justify-between">{name ? name : "John Doe"}</h1>
        <div className="flex justify-between">
          <p className="text-lg text-sec2 font-medium">Los Angeles, CA</p>
          <div className="flex items-center gap-1">
            <p className="font-medium">20</p>
            <Image priority src={Home} alt="Homes" height={27} className="relative bottom-[2px]"></Image>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
