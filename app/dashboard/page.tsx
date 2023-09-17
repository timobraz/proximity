"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, RadarControllerChartOptions } from "chart.js";
import { Radar } from "react-chartjs-2";
import Link from "next/link";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Register() {
  const [url, setURL] = useState("");
  useEffect(() => {
    async function avgQuery() {
      setLoading(true);
      try {
        const avgs = JSON.parse(localStorage.getItem("avgs")!);
        console.log(avgs);

        const resp = await axios.put("/api/dashboard", {
          sqft: avgs.sqftavg,
          price: avgs.priceavg,
          bedrooms: avgs.bedroomsavg,
          bathrooms: avgs.bathroomsavg,
          yearBuilt: avgs.builtavg,
        });
        if (resp.status == 200) {
          console.log("good", resp.data);
          resp.data.pic = JSON.parse(localStorage.getItem("properties")!)[0].pic;
          setProperty(resp.data);
        }

        const resp2 = await axios.post("/api/image", { url: JSON.parse(localStorage.getItem("properties")!)[0].pic });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    avgQuery();
  }, []);
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState<any>(null);
  const [avgs, _] = useState(JSON.parse(localStorage.getItem("avgs")!));
  const data = {
    labels: ["Property", "Interior", "Yard", "Bathroom", "Bedroom"],
    datasets: [
      {
        label: "Property Rating",
        data: [
          Number((Math.random() * 5).toFixed(1)),
          Number((Math.random() * 5).toFixed(1)),
          Number((Math.random() * 5).toFixed(1)),
          Number((Math.random() * 5).toFixed(1)),
          Number((Math.random() * 5).toFixed(1)),
        ],
        color: "white",
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        fill: true,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 5,
      },
      {
        label: "Your Average Rating",
        data: [3.8, 2.3, 1.5, 2, 4.2],
        color: "white",
        backgroundColor: "rgba(50, 99, 255, 0.4)",
        fill: true,
        borderColor: "rgba(50, 99, 255, 1)",
        borderWidth: 5,
      },
    ],
  };
  const options = {
    //   legend: {color:"white"},
    plugins: {
      legend: {
        labels: { color: "white", font: { size: 20 } },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "white",
        },
        ticks: {
          color: "white",
          showLabelBackdrop: false,
          font: { size: 18 },
          stepSize: 1,
        },
        pointLabels: {
          color: "white",

          font: { size: 18, weight: "700" },
        },
        grid: {
          color: "white",
          width: 5,
          lineWidth: 2,
        },
        min: 0,
        max: 5,
      },
    },
  };
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

  async function match() {
    setLoading(true);
    try {
      const resp = await axios.post("/api/dashboard", { url });
      if (resp.status == 200) {
        console.log("good", resp.data);
        setProperty(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <div className=" bg-prim snap-y snap-mandatory min-h-screen w-screen overflow-y-scroll p-20">
      <motion.div
        className="w-full h-full rounded-xl flex flex-col py-6 px-4 gap-4 items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="text-4xl font-bold w-full text-center text-sec " variants={item}>
          Matchmaker Analysis
        </motion.h1>
        <motion.label className="text-2xl    text-sec w-full font-bold" htmlFor="name" variants={item}>
          Current Zillow URL
        </motion.label>
        <motion.div className="flex flex-row gap-2  w-full items-center h-14 mb-2" variants={item}>
          <motion.input
            value={url}
            onChange={(e) => setURL(e.target.value)}
            type="text"
            id="name"
            placeholder="Input Zillow URL for property you're interested in"
            className=" px-4   text-xl focus:ring-acc block rounded-lg ring-lightacc ring-1 flex-1 h-full"
          />
          <motion.button
            className="bg-acc text-sec shadow-sm px-2 h-full rounded-lg text-xl font-black outline-none hover:outline-lightacc outline-2 transition-[background-color,_outline] duration-300 hover:outline "
            type="submit"
            onClick={match}
          >
            Analyze Property
          </motion.button>
        </motion.div>
        {property && (
          <>
            <motion.div className="w-full  h-full rounded-xl flex flex-col gap-6" variants={container} initial="hidden" animate="show">
              <motion.div
                className="w-full  outline-4 bg-sec outline-lightacc rounded-xl outline flex-row flex  h-auto overflow-scroll max-h-[30rem]"
                variants={item}
              >
                <a
                  target="_blank"
                  className="min-w-[50%] object-cover"
                  href={"https://www.zillow.com/homes/" + property.output.address.replaceAll(" ", "-")}
                >
                  <img src={property?.pic?.replace("192", "768")} className=" h-full  bg-lightacc min-w-full" />
                </a>
                <div className="px-5 py-2 flex-col flex justify-evenly gap-2">
                  <motion.h1
                    className="text-2xl font-bold flex justify-between items-center text-center text-sec bg-sec2 p-3 rounded-xl hover: cursor-pointer"
                    variants={item}
                  >
                    Similarity to past investments:{" "}
                    <span className="bg-acc hover:bg-lightacc transition-all hover:scale-110 p-2 text-2xl text-sec mx-2 rounded-xl">
                      {property.output.relevancy.toFixed(2) * 100}%
                    </span>
                  </motion.h1>
                  <h1 className="text-2xl font-black">{property.output.address}</h1>
                  <h1 className="text-xl font-normal">${Number(property.output.price).toLocaleString()}</h1>
                  <h1 className="text-xl font-normal">Built: {property.output["year built"]}</h1>
                  <h1 className="text-xl font-normal">Bathrooms: {property.output.bathrooms}</h1>
                  <h1 className="text-xl font-normal">Bedrooms: {property.output.bedrooms}</h1>
                  <div className="overflow-scroll w-full h-min">
                    <p className="text-lg font-semibold text-ellipsis">{property.chatgpt}</p>
                  </div>
                  {/* <a
                    href={"https://www.zillow.com/homes/" + property.output.address.replaceAll(" ", "-")}
                    className="bottom-1 left-1/4 bg-lightacc p-4 text-sec font-bold text-2xl rounded-xl outline-none hover:outline-lightacc outline-2 transition-[background-color,_outline] duration-300 hover:outline "
                  >
                    View On Zillow
                  </a> */}
                </div>
              </motion.div>
              <motion.div className="flex flex-col gap-4 bg-sec2  rounded-xl px-8 py-6">
                <motion.h1 className="text-3xl font-bold  self-center  text-sec  rounded-xl w-full " variants={item}>
                  Quality Rating
                </motion.h1>
                <motion.div className="flex flex-row w-full items-center justify-between h-auto ">
                  <motion.div className="flex flex-col gap-2  px-8 py-2 items-center justify-center h-full bg-lightacc rounded-xl outline outline-2 outline-lightacc outline-offset-2 transform hover:scale-105 transition-all duration-300">
                    <h1 className="text-3xl font-bold w-full text-center text-sec">Property</h1>
                    <h1 className="text-2xl font-bold w-full text-center text-sec">{data.datasets[0].data[0]}</h1>
                  </motion.div>
                  <motion.div className="flex flex-col gap-2  px-8 py-2 items-center justify-center h-full bg-lightacc rounded-xl outline outline-2 outline-lightacc outline-offset-2 transform hover:scale-105 transition-all duration-300">
                    <h1 className="text-3xl font-bold w-full text-center text-sec">Interior</h1>
                    <h1 className="text-2xl font-bold w-full text-center text-sec">{data.datasets[0].data[1]}</h1>
                  </motion.div>
                  <motion.div className="flex flex-col gap-2  px-8 py-2 items-center justify-center h-full bg-lightacc rounded-xl outline outline-2 outline-lightacc outline-offset-2 transform hover:scale-105 transition-all duration-300">
                    <h1 className="text-3xl font-bold w-full text-center text-sec">Restrooms</h1>
                    <h1 className="text-2xl font-bold w-full text-center text-sec">{data.datasets[0].data[2]}</h1>
                  </motion.div>
                  <motion.div className="flex flex-col gap-2  px-8 py-2 items-center justify-center h-full bg-lightacc rounded-xl outline outline-2 outline-lightacc outline-offset-2 transform hover:scale-105 transition-all duration-300">
                    <h1 className="text-3xl font-bold w-full text-center text-sec">Bedrooms</h1>
                    <h1 className="text-2xl font-bold w-full text-center text-sec">{data.datasets[0].data[3]}</h1>
                  </motion.div>
                  <motion.div className="flex flex-col gap-2  px-8 py-2 items-center justify-center h-full bg-lightacc rounded-xl outline outline-2 outline-lightacc outline-offset-2 transform hover:scale-105 transition-all duration-300">
                    <h1 className="text-3xl font-bold w-full text-center text-sec">Bedrooms</h1>
                    <h1 className="text-2xl font-bold w-full text-center text-sec">{data.datasets[0].data[4]}</h1>
                  </motion.div>
                </motion.div>
                <div className="w-2/5 self-center my-4">
                  <Radar data={data} options={options} />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
        {loading && (
          <div className="lds-grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {!loading && !property && (
          <motion.h3 className="text-3xl  my-4  text-sec  font-bold w-full text-center" variants={item}>
            Current Averages
          </motion.h3>
        )}
        {!loading && !property && (
          <motion.div className="flex flex-row gap-4 w-full items-center justify-center h-auto mb-2" variants={item}>
            <div className="flex flex-col gap-2  px-8 py-2 items-center justify-center h-full bg-lightacc rounded-xl transform hover:scale-105 transition-all">
              <h1 className="text-4xl font-bold w-full text-center text-sec">Price</h1>
              <h1 className="text-3xl font-bold w-full text-center text-sec">${avgs.priceavg.toLocaleString()}</h1>
            </div>
            <motion.div className="flex flex-col gap-2  px-8 py-2 items-center justify-center h-full bg-lightacc rounded-xl">
              <h1 className="text-4xl font-bold w-full text-center text-sec">Year Built</h1>
              <h1 className="text-3xl font-bold w-full text-center text-sec">{avgs.builtavg}</h1>
            </motion.div>
            <motion.div className="flex flex-col gap-2  px-8 py-2 items-center justify-center h-full bg-lightacc rounded-xl">
              <h1 className="text-4xl font-bold w-full text-center text-sec">Area</h1>
              <h1 className="text-3xl font-bold w-full text-center text-sec">{avgs.sqftavg.toLocaleString()} sqft</h1>
            </motion.div>
            <motion.div className="flex flex-col gap-2  px-8 py-2 items-center justify-center h-full bg-lightacc rounded-xl">
              <h1 className="text-4xl font-bold w-full text-center text-sec">Bathrooms</h1>
              <h1 className="text-3xl font-bold w-full text-center text-sec">1.4</h1>
            </motion.div>
            <motion.div className="flex flex-col gap-2  px-8 py-2 items-center justify-center h-full bg-lightacc rounded-xl">
              <h1 className="text-4xl font-bold w-full text-center text-sec">Bedrooms</h1>
              <h1 className="text-3xl font-bold w-full text-center text-sec">2.3</h1>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
    // </div>
  );
}
