"use client";
import { motion, useAnimate, useInView } from "framer-motion";
import React, { useEffect } from "react";
import Card from "../Card";

export default function CardScroll() {
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
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    console.log(isInView);

    if (isInView) {
      animate(
        ".scrollt",
        {
          x: 0,
          opacity: 1,
        },
        {
          type: "spring",
          bounce: 0.2,
          duration: 2,
        }
      );
      animate(
        "h3",
        {
          x: 0,
          opacity: 1,
        },
        {
          type: "spring",
          bounce: 0.2,
          duration: 2,
        }
      );
    } else {
      animate(
        ".scrollt",
        {
          x: -25,
          opacity: 0,
        },
        {
          duration: 0.01,
        }
      );
      animate(
        "h3",
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
    <motion.div
      className="h-screen shrink-0 flex items-start justify-center snap-start snap-always flex-col my-10 overflow-x-hidden p-10"
      ref={scope}
    >
      <motion.h3 className="text-3xl font-bold text-sec" initial="hidden" variants={revealVar(100)}>
        Meet Investors
      </motion.h3>

      <motion.main className="scrollt flex gap-4 w-full overflow-x-scroll py-4 px-2" initial="hidden" variants={revealVar(-100)}>
        <Card name="mike"></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </motion.main>
    </motion.div>
  );
}
