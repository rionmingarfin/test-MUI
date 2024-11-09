"use client";

import { motion } from "framer-motion";
import { styles } from "@/styles";
import { ReactNode } from "react";

const SectionWrapper = (Component: ReactNode, idName: string | undefined) =>
  function HOC() {
    return (
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-10 bg-white`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        {Component}
      </motion.section>
    );
  };

export default SectionWrapper;
