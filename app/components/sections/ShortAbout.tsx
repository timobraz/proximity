import { Bounds, Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Model } from "../models/Castlelowp";
import Light from "../models/Light";
import { motion, useInView, useAnimate } from "framer-motion";

const revealVar = (x: number) => {
  return {
    hidden: {
      x,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        bounce: 0.2,
        duration: 0.7,
      },
    },
  };
};
export default function ShortAbout() {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    console.log(isInView);

    if (isInView) {
      animate(
        "section",
        {
          x: 0,
          opacity: 1,
        },
        {
          type: "spring",
          bounce: 0.3,
          duration: 2,
        }
      );
      animate(
        "div",
        {
          x: 0,
          opacity: 1,
        },
        {
          type: "spring",
          bounce: 0.3,
          duration: 2,
        }
      );
    } else {
      animate(
        "div",
        {
          x: -25,
          opacity: 0,
        },
        {
          duration: 0.01,
        }
      );
      animate(
        "section",
        {
          x: 25,
          opacity: 0,
        },
        {
          duration: 0.01,
        }
      );
    }
  }, [isInView]);

  return (
    <motion.div className="h-screen shrink-0 flex items-center snap-start snap-always lg:flex-row flex-col my-10 overflow-x-hidden" ref={scope}>
      <motion.div className="hidden lg:block  h-full grow" variants={revealVar(-200)} initial="hidden">
        <Canvas className=" bg-prim" camera={{ position: [1, 1, 1] }} linear>
          <Bounds fit damping={100} margin={1.35}>
            <Light intensity={0.9} position={[2, 1, 6]}></Light>
            <Light intensity={0.9} position={[-2, 1, -6]}></Light>
            <Light intensity={0.9} position={[4, 4, -2.5]}></Light>
            <Light intensity={0.9} position={[-4, 4, 2.5]}></Light>
            <ambientLight position={[-2, 1.5, -2]} intensity={0.7} />
            <color args={["#38c746"]}></color>
            <Float floatIntensity={1.5} speed={1} rotationIntensity={0.5}>
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
      </motion.div>
      <motion.section className="flex h-full lg:w-1/2 flex-col px-6 justify-center gap-4 " variants={revealVar(200)} initial="hidden">
        <motion.p className="text-4xl font-extrabold text-sec">What do we do?</motion.p>
        <motion.p className="text-2xl font-normal text-sec">
          Proximity is the due diligence co-pilot that leverages AI on public and private datasets to equip real estate investors with actionable
          insights and analytical capabilities to make better data-driven investment decisions. Investors and agents can effortlessly screen property
          deals, generate comprehensive comparative analyses, pinpoint potential red flags, manage due diligence requests seamlessly, and navigate
          their entire real estate portfolio effortlessly. Proximity redefines real estate due diligence, making it smarter, quicker, and more
          effective than ever before.
        </motion.p>
        <motion.button className="btn-rd-blue w-max">Browse</motion.button>
      </motion.section>
    </motion.div>
  );
}
