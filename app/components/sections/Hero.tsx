"use client";
import React from "react";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Model } from "../models/House2";
import { Bounds, Float, OrbitControls } from "@react-three/drei";
import Light from "../models/Light";
const container = {
  hidden: { opacity: 0, y: 75 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 75 },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function Hero() {
  return (
    <div className="flex shrink-0 h-screen items-center lg:flex-row flex-col snap-always snap-start">
      <motion.div
        className="flex flex-col items-start gap-4 text-sec xl:px-28 px-8 xl:mt-0 mt-24"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.h1 variants={item} className="xl:text-7xl text-5xl font-extrabold text-sec max-w-3xl ">
          The first platform for <span className="text-acc">investors.</span>
        </motion.h1>
        <motion.h3 variants={item} className="text-sec xl:text-2xl text-xl max-w-2xl ">
          Automating due diligence on real estate properties.
        </motion.h3>
        <motion.button variants={item} className="btn-rd-blue ">
          Join
        </motion.button>
      </motion.div>
      <div className=" h-full w-1/2 lg:block hidden">
        <Canvas className="bg-prim flex">
          <Bounds fit margin={1.3}>
            <Light intensity={0.9} position={[2, 1, 2]}></Light>
            <Light intensity={0.9} position={[-2, 1, -2]}></Light>

            {/* <directionalLight position={[2, -2, 2]} intensity={0.9} />
            <directionalLight position={[0, 0, 0]} intensity={0.5} /> */}

            <ambientLight position={[-1, 1, -2]} intensity={0.5} />

            <color args={["#38c746"]}></color>

            <Float floatIntensity={1.5} speed={1} rotationIntensity={0.3}>
              <Model></Model>
            </Float>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={-Math.PI / 4}
            />
          </Bounds>
        </Canvas>
      </div>
    </div>
  );
}
