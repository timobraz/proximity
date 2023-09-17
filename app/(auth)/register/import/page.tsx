"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Register() {
  const [url, setURL] = useState("");
  const [preview, setPreview] = useState<any[]>([]);
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

  async function scrape() {
    try {
      const resp = await axios.put("/api/register", { url });
      if (resp.status == 200) {
        console.log("good", resp.data);
        setPreview(preview.concat(resp.data));
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function calcAverages() {
    localStorage.setItem("properties", JSON.stringify(preview));

    let price: number = 0;
    let built: number = 0;
    let bathrooms: number = 0;
    let sqft: number = 0;
    let bedrooms: number = 0;
    preview.forEach((prev) => {
      price += Number(prev.price);
      built += Number(prev.yearBuilt);
      bathrooms += Number(prev.bathrooms);
      bedrooms += Number(prev.bedrooms);
      sqft += Number(prev.sqft);
    });
    let priceavg = price / preview.length;
    let builtavg = built / preview.length;
    let bathroomsavg = bathrooms / preview.length;
    let bedroomsavg = bedrooms / preview.length;
    let sqftavg = sqft / preview.length;
    localStorage.setItem("avgs", JSON.stringify({ priceavg, builtavg, bathroomsavg, bedroomsavg, sqftavg }));
  }
  return (
    <div className="w-[50rem] w shadow-md min-h-4/5 rounded-xl flex self-center flex-col gap-1 ">
      <motion.div className="w-full h-full bg-sec rounded-xl flex flex-col py-6 px-4 gap-2" variants={container} initial="hidden" animate="show">
        <motion.h1 className="text-3xl font-bold " variants={item}>
          Import Zillow Properties
        </motion.h1>
        <motion.label className="text-md font-medium" htmlFor="name" variants={item}>
          Zillow URL
        </motion.label>
        <motion.div className="flex flex-row gap-2  w-full items-center h-14 mb-2" variants={item}>
          <motion.input
            value={url}
            onChange={(e) => setURL(e.target.value)}
            type="text"
            id="name"
            placeholder="Input ZIllow property URL"
            className=" px-4  text-xl focus:ring-acc block rounded-lg ring-lightacc ring-1 flex-1 h-full"
          />
          <motion.button
            className="bg-acc text-sec shadow-sm px-2 h-full rounded-lg text-xl font-black outline-none hover:outline-lightacc outline-2 transition-[background-color,_outline] duration-300 hover:outline "
            type="submit"
            onClick={scrape}
          >
            Add Property
          </motion.button>
        </motion.div>
        <div className="gap-4 flex-col flex">
          {preview &&
            preview.map((prev: any) => (
              <motion.div className="w-full  outline-2 outline-lightacc rounded-xl outline flex-row flex  h-auto " variants={item}>
                <img src={prev.pic.replace("192", "768")} className="w-[25rem] h-fit" />
                <div className="p-3  flex-1 justify-between flex-col flex">
                  <div>
                    <h1 className="text-xl font-black">{prev.region}</h1>
                    <h1 className="text-xl font-normal">${prev.price}</h1>
                    <h1 className="text-xl font-normal">{prev.sqft} sqft</h1>
                    <h1 className="text-xl font-normal">Built: {prev.yearBuilt}</h1>
                    <h1 className="text-xl font-normal">Bathrooms: {prev.bathrooms}</h1>
                    <h1 className="text-xl font-normal">Bedrooms:{prev.bedrooms}</h1>
                  </div>
                  <a
                    href={"https://www.zillow.com/homes/" + prev.region.replaceAll(" ", "-")}
                    target="_blank"
                    className=" bg-lightacc p-3 text-sec font-bold text-xl  text-center rounded-xl outline-none hover:outline-lightacc outline-2 transition-[background-color,_outline] duration-300 hover:outline "
                  >
                    View On Zillow
                  </a>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
      <motion.button
        className={`bg-acc text-sec shadow-sm px-2 h-14 rounded-lg text-xl font-black outline-none hover:outline-lightacc outline-2 transition-[background-color,_outline] 
        duration-300 hover:outline`}
        type="submit"
        onClick={() => {
          calcAverages();
          router.push("/dashboard");
        }}
      >
        {preview ? "Continue" : "Skip"}
      </motion.button>
    </div>
    // </div>
  );
}
