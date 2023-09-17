"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [business, setBusiness] = useState(false);
  const router = useRouter();
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        duration: 1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: -25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  async function submit() {
    try {
      const resp = await axios.post("/api/register", {
        name,
        password,
        email,
        isBusiness: business,
      });

      if (resp.status == 200) {
        console.log("good", resp.data);
        router.push("/register/import");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="md:w-[50rem] w-full bg-sec2 shadow-md h-4/5 rounded-xl flex justify-end self-center">
      <motion.img
        className="w-1/2 object-contain bg-acc rounded-l-xl "
        src="logo3.png"
        initial={{ width: 0 }}
        animate={{
          width: window.innerWidth > 700 ? "48%" : "1rem",
          transition: {
            ease: "easeOut",

            duration: 1.2,
          },
        }}
      ></motion.img>
      <motion.div
        className=" w-full h-full bg-sec rounded-r-xl flex flex-col py-6 px-4 justify-evenly"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="text-3xl font-bold " variants={item}>
          Register
        </motion.h1>
        <motion.div className="flex flex-col gap-1  w-full" variants={item}>
          <motion.label className="text-md font-medium" htmlFor="name">
            Name
          </motion.label>
          <motion.input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className=" p-2 focus:ring-acc block rounded-lg ring-lightacc ring-1"
          />
        </motion.div>
        <motion.div className="flex flex-col gap-1  w-full" variants={item}>
          <motion.label className=" text-md font-medium" htmlFor="email">
            Email
          </motion.label>
          <motion.input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="p-2 focus:ring-acc block  rounded-lg ring-lightacc ring-1"
          />
        </motion.div>
        <motion.div className="flex flex-col gap-1  w-full" variants={item}>
          <motion.label className=" text-md font-medium" htmlFor="password">
            Password
          </motion.label>
          <motion.input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="p-2 focus:ring-acc block  rounded-lg ring-lightacc ring-1"
          />
        </motion.div>
        <motion.div className="flex flex-col gap-1 w-full relative  cursor-pointer " variants={item} onClick={() => setBusiness(!business)}>
          <label className=" text-lg font-medium">Are you selling CRE?</label>
          <div className={"flex h-12 rounded-lg outline-1 outline outline-lightacc justify-center"}>
            <div className={"w-1/2  h-full rounded-l-lg flex justify-center items-center   " + (business ? " bg-sec" : "bg-acc")}>
              <h1 className={"text-xl font-black  " + (business ? " text-acc" : "text-sec")}>No</h1>
            </div>
            <div className={"w-1/2 h-full rounded-r-lg flex justify-center items-center   " + (business ? " bg-acc" : " bg-sec")}>
              <h1 className={"text-xl font-black " + (business ? " text-sec" : "text-acc")}>Yes</h1>
            </div>
          </div>
          {/* <div className={"flex h-14 bg-sec rounded-lg outline-1 outline outline-lightacc " + (business ? " justify-start" : "justify-end")}>
              <div className={"w-1/2 bg-acc " + (!business ? " rounded-r-lg" : "rounded-l-lg")} />
            </div> */}
        </motion.div>
        <motion.button
          className="bg-acc text-sec shadow-sm px-8 py-4 mt-2 rounded-lg text-2xl font-black outline-none hover:outline-lightacc outline-2 transition-[background-color,_outline] duration-300 hover:outline "
          type="submit"
          variants={item}
          onClick={submit}
        >
          Register
        </motion.button>
      </motion.div>
    </div>
    // </div>
  );
}
