"use client";
import React, { useContext } from "react";
import Image from "next/image";
import logo from "@/assets/image/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageIcon from "@mui/icons-material/Language";
import Dropdown from "@/components/dropDown";
import { GlobalContext } from "@/context/globalState";

const Navbar = () => {
  const { messages, locale } = useContext(GlobalContext);
  const pathname = usePathname();
  return (
    <>
      <div className="bg-[#ECEFF1] px-5 py-2">
        <div className="flex justify-end container">
          <LanguageIcon sx={{ fontSize: 40, color: "#37474F" }} />
          <Dropdown />
        </div>
      </div>
      <nav className="sticky top-0 bg-white transition duration-300 z-20">
        <div className="container mx-auto p-4">
          <div className="flex items-center ">
            <ul className="flex flex-row font-medium space-x-8 text-sm justify-start">
              <li>
                <Image
                  src={logo}
                  alt="Hero Image"
                  className="w-32 h-auto object-cover"
                  priority
                />
              </li>
              <li className="flex items-center justify-center">
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "text-[#F9A825]" : "text-[#37474F]"
                  } text-base`}
                  passHref
                >
                  {messages[locale].home}
                </Link>
              </li>
              <li className="flex items-center justify-center">
                <Link
                  passHref
                  href="/pokemonType"
                  className={`${
                    pathname === "/pokemonType"
                      ? "text-[#F9A825]"
                      : "text-[#37474F]"
                  } text-base`}
                >
                  {messages[locale].typePokemon}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
