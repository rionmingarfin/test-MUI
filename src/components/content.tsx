"use client";
import React, { useEffect, useState, ChangeEvent, useContext } from "react";
import Image from "next/image";
import imgPok from "@/assets/image/pokemon.jpg";
import axios from "axios";

import DialogDetail from "@/components/dialog";
import { SelectChangeEvent } from "@mui/material";
import Link from "next/link";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Button from "@mui/material/Button";
import { useTheme, useMediaQuery } from "@mui/material";
import { colors } from "@/utils/colorPicker";
import CustomPagination from "@/components/pagination";
import CustomSelect from "@/components/select";
import CustomBadge from "@/components/badge";
import { Ability, IStateDataPokemon } from "@/models/pokemon";
import { GlobalContext } from "@/context/globalState";

function Content() {
  const { messages, locale } = useContext(GlobalContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState<boolean>(false);

  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [detailPoke, setDetailPoke] = useState<IStateDataPokemon>();
  const [dataPok, setDataPok] = useState<IStateDataPokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const offset = (page - 1) * itemsPerPage;
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=${offset}`
        );
        const abilityDetails = await Promise.all(
          data?.results?.map(async (ability: Ability) => {
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${ability.name}/`
            );
            return {
              name: ability.name,
              url: ability.url,
              detail: response.data,
            };
          })
        );
        setCount(data?.count);
        setDataPok(abilityDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page, itemsPerPage]);

  const handleClickOpen = (value: IStateDataPokemon) => {
    setDetailPoke(value);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeLimit = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as number;
    if (value >= 0) {
      setItemsPerPage(value);
    }
  };
  const handleDoublePage = () => {
    setPage(page + 5);
  };
  const handleDoublePageMin = () => {
    const pageData = page - 5 > 0 ? page - 5 : 1;
    setPage(pageData);
  };
  return (
    <div className="bg-[#FBC02D] relative overflow-hidden" id="pokemon-list">
      <div
        className={`absolute hidden md:flex w-96 h-96 rounded-full border-[1.25rem] md:border-[7rem] top-[-10%] left-[-10%]`}
        style={{
          borderColor: "rgba(255, 255, 255,0.5)",
        }}
      />
      <div
        className={`absolute hidden md:flex w-96 h-96 rounded-full border-[1.25rem] md:border-[7rem] bottom-[-10%] right-[-10%]`}
        style={{
          borderColor: "rgba(255, 255, 255,0.5)",
        }}
      />
      <div className="sm:container mx-auto px-2 md:px-3 sm-px-4 xl:px-2 overflow-hidden">
        <div className="flex justify-center text-center">
          <div className="py-10">
            <h2 className="text-[#37474F] font-bold mb-3 md:mb-5 text-2xl md:text-5xl">
              {messages[locale].subTitle}
            </h2>
            <p className="text-[#37474F] font-semibold text-base md:text-2xl">
              {messages[locale].subDesc}
            </p>
            <p className="text-base font-semibold text-[#37474F] md:text-2xl">
              {count} pokemon
            </p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap">
          {dataPok.map((item, index: number) => {
            const name =
              item?.name &&
              item?.name?.charAt(0).toUpperCase() +
                item?.name?.slice(1).toLowerCase();
            return (
              <div
                className="w-full overflow-hidden sm:w-1/2 md:w-1/3"
                key={index}
              >
                <div
                  className="bg-white rounded-3xl shadow p-5 mx-10 my-5 flex-shrink-0 transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
                  onClick={() => handleClickOpen(item)}
                >
                  <Image
                    src={
                      item.detail.sprites.other?.home?.front_default ?? imgPok
                    }
                    alt={name}
                    className="w-full h-auto object-cover"
                    width={500}
                    height={500}
                    quality={100}
                    priority
                  />
                  <p className="font-bold text-gray-400 py-2">
                    # {item?.detail.id}
                  </p>
                  <h2 className="text-3xl font-bold mb-2 text-[#37474F]">
                    {name}
                  </h2>
                  <div className="flex flex-row flex-wrap w-full py-4 gap-2 justify-start">
                    {item?.detail?.types.map((type, index: number) => (
                      <Link
                        href={`/pokemonType?url=${encodeURIComponent(
                          type?.type?.name
                        )}`}
                        key={index}
                        passHref
                      >
                        <CustomBadge
                          key={index}
                          backgroundColor={colors[index % colors.length]}
                        >
                          {type.type.name}
                        </CustomBadge>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-row flex-wrap gap-4 justify-around md:justify-between my-4 container">
          <div className="flex">
            <div className="flex justify-center items-center mr-2 md:mr-10">
              <p className="text-white font-bold text-base">
                {messages[locale].page}:
              </p>
            </div>
            <CustomSelect
              itemsPerPage={itemsPerPage}
              handleChange={handleChangeLimit}
              borderColor="#FFFFFF"
            />
          </div>
          <div className="flex flex-row justify-center items-center order-first md:order-none">
            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                borderWidth: 1,
                padding: 0.4,
                margin: 0,
                minWidth: "auto",
                borderRadius: 2,
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "white",
                },
                "& .MuiSvgIcon-root": { margin: 0 },
              }}
              disabled={page <= 1}
              onClick={handleDoublePageMin}
            >
              <KeyboardDoubleArrowLeftIcon />
            </Button>
            <CustomPagination
              count={Math.ceil(count / itemsPerPage)}
              page={page}
              onChange={handleChange}
              siblingCount={isMobile ? 0 : 1}
              boundaryCount={isMobile ? 1 : 2}
              borderColor="white"
              selectedBackgroundColor="white"
              selectedColor="black"
            />
            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                borderWidth: 1,
                padding: 0.4,
                margin: 0,
                minWidth: "auto",
                borderRadius: 2,
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "white",
                },
                "& .MuiSvgIcon-root": { margin: 0 },
              }}
              onClick={handleDoublePage}
              disabled={page >= Math.ceil(count / itemsPerPage)}
            >
              <KeyboardDoubleArrowRightIcon />
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-white text-md font-bold pr-2 md:pr-5">
              {messages[locale].total}:
            </p>
            <p className="text-white text-md font-bold md:pr-5">{count}</p>
          </div>
        </div>
      </div>
      <DialogDetail open={open} onClose={handleClose} data={detailPoke} />
    </div>
  );
}

export default Content;
