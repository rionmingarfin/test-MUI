"use client";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "@/hoc/SectionWrapper";
import { fadeIn } from "@/utils/motion";
import { useContext } from "react";
import { GlobalContext } from "@/context/globalState";

const Hero = () => {
  const { messages, locale } = useContext(GlobalContext);
  return (
    <div className="bg-white mb-3 h-[60vh] md:h-screen flex flex-wrap flex-row items-center justify-center  relative z-[1]">
      <motion.div
        variants={fadeIn("right", "spring", 0.4, 0.9)}
        className="md:w-1/2 text-center md:text-left p-4"
      >
        <h1 className=" text-2xl md:text-6xl font-bold text-[#37474F]">
          {messages[locale].welcome}
        </h1>{" "}
        <p className="text-base md:text-xl text-gray-400 mt-4">
          {messages[locale].description}
        </p>{" "}
        <div className="pt-6">
          <Link href="#pokemon-list" passHref>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F9A825",
                "&:hover": { backgroundColor: "#FDD835" },
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              {messages[locale].button}
            </Button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("left", "spring", 0.4, 0.95)}
        className=" w-full md:w-1/2 "
      >
        <Image
          unoptimized
          src={"/image/twopoke.png"}
          alt="Hero Image"
          width={800}
          height={800}
          quality={100}
          layout="responsive"
          className="w-full h-auto  transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
        />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(<Hero />, "hero");
