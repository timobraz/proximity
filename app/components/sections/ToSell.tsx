"use client";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import React, { useEffect } from "react";
import Card from "../Card";
import { useRouter } from "next/navigation";

export default function ToSell() {
  const revealVar = (x: number) => {
    return {
      hidden: {
        // x,
        scale: 0,
        opacity: 0,
      },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: {
          bounce: 0.2,
          duration: 0.7,
        },
      },
    };
  };
  const [scope, animate] = useAnimate();
  const router = useRouter();
  const isInView = useInView(scope);
  useEffect(() => {
    console.log(isInView);

    if (isInView) {
      animate(
        ".it",
        {
          x: 0,
          scale: 1,
          opacity: 1,
        },
        {
          type: "spring",
          bounce: 0.2,
          duration: 2,
          delay: stagger(0.25),
        }
      );
    } else {
      animate(
        ".it",
        {
          //   x: -50,
          scale: 0.5,
          opacity: 0,
        },
        {
          duration: 0.01,
        }
      );
    }
  }, [isInView]);
  return (
    <motion.div
      className="h-screen shrink-0 flex items-center bg-sec justify-center snap-start snap-always flex-col gap-6 my-10 overflow-x-hidden p-10"
      ref={scope}
    >
      <motion.h1 className="lg:text-6xl text-4xl text-center  font-extrabold text-acc it" variants={revealVar(-100)} initial="hidden">
        Do you want to sell your house?
      </motion.h1>
      <motion.h1 className="lg:text-4xl text-center text-2xl font-extrabold text-sec2   it" variants={revealVar(-100)} initial="hidden">
        List your property for investors to see
      </motion.h1>
      <motion.button
        className="btn-rd-blue it text-center self-center"
        variants={revealVar(-100)}
        initial="hidden"
        onClick={() => {
          router.push("/register");
        }}
      >
        Become a seller
      </motion.button>
    </motion.div>
  );
}
