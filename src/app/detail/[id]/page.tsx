"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import pokKind from "@/assets/image/kind.png";
import Link from "next/link";
import CustomBadge from "@/components/badge";
import LoadingScreen from "@/components/loading";
import { colors } from "@/utils/colorPicker";
import { IPokemon } from "@/models/pokemon";
import Layout from "@/components/layout";
import { GlobalContext } from "@/context/globalState";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const { messages, locale } = useContext(GlobalContext);

  const safeId = id?.toString() ?? "undefined";

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPokemon>();

  useEffect(() => {
    if (!safeId) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${safeId}`
        );
        if (!response) return;
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [safeId]);
  const name =
    data?.name &&
    data?.name?.charAt(0).toUpperCase() + data?.name?.slice(1).toLowerCase();

  return (
    <Layout>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="container mx-auto p-4">
            <div className="flex flex-col flex-wrap md:flex-row">
              <div className="w-full md:w-1/2">
                <Image
                  src={data?.sprites?.other?.home?.front_default ?? pokKind}
                  alt="Hero Image"
                  width={500}
                  height={500}
                  quality={100}
                />
              </div>
              <div className="w-full md:w-1/2 pl-4">
                <h6 className="font-bold text-2xl text-[#37474F]">{name}</h6>
                <div className="flex py-4 justify-between md:justify-normal">
                  <div className="flex">
                    <p className="font-bold text-[#37474F]">
                      {messages[locale].weight}:
                    </p>
                    <p className="pl-2 md:ml-10 text-[#37474F]">
                      {data?.weight}
                    </p>
                  </div>
                  <div className="flex ml-2 md:ml-10">
                    <p className=" font-bold text-[#37474F]">
                      {messages[locale].height}:
                    </p>
                    <p className="pl-2 md:ml-10">{data?.height}</p>
                  </div>
                </div>
                <div className="flex flex-row">
                  <p className="font-bold text-[#37474F]">
                    {messages[locale].ability}:
                  </p>
                  <div className="flex flex-col">
                    {data?.abilities?.map((ability, index: number) => (
                      <ul className="ml-10 list-disc" key={index}>
                        <li className="text-[#37474F]">
                          {ability?.ability?.name}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
                <div className="flex py-4">
                  <div className="flex ">
                    <p className="font-bold pr-2 text-[#37474F]">
                      {messages[locale].type}:
                    </p>
                  </div>

                  <div className="flex flex-wrap w-full gap-2">
                    {data?.types?.map((type, index: number) => (
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
            </div>
          </div>

          <div className="container mx-auto p-4">
            <h6 className="text-[#37474F] font-bold text-base py-5">
              {messages[locale].otherImages} :
            </h6>

            <div className="flex flex-wrap">
              <div className="w-1/2 md:w-1/3 lg:w-1/6 p-2 flex">
                <Image
                  src={data?.sprites?.other?.home?.front_default ?? pokKind}
                  alt="Hero Image 1"
                  className="w-full h-full"
                  width={500}
                  height={500}
                  quality={100}
                />
              </div>
              <div className="w-1/2 md:w-1/3 lg:w-1/6 p-2">
                <Image
                  src={data?.sprites?.other?.home?.front_default ?? pokKind}
                  alt="Hero Image 2"
                  className="w-full h-full"
                  width={500}
                  height={500}
                  quality={100}
                />
              </div>
              <div className="w-1/2 md:w-1/3 lg:w-1/6 p-2">
                <Image
                  src={data?.sprites?.other?.home?.front_shiny ?? pokKind}
                  alt="Hero Image 3"
                  className="w-full h-full"
                  width={500}
                  height={500}
                  quality={100}
                />
              </div>
              <div className="w-1/2 md:w-1/3 lg:w-1/6 p-2">
                <Image
                  src={data?.sprites?.other?.home?.front_shiny ?? pokKind}
                  alt="Hero Image 6"
                  className="w-full h-full"
                  width={500}
                  height={500}
                  quality={100}
                />
              </div>
              <div className="w-1/2 md:w-1/3 lg:w-1/6 p-2">
                <Image
                  src={
                    data?.sprites?.other!["official-artwork"].front_shiny ??
                    pokKind
                  }
                  alt="Hero Image 4"
                  className="w-full h-full"
                  width={500}
                  height={500}
                  quality={100}
                />
              </div>
              <div className="w-1/2 md:w-1/3 lg:w-1/6 p-2">
                <Image
                  src={
                    data?.sprites?.other!["official-artwork"]?.front_default ??
                    pokKind
                  }
                  alt="Hero Image 5"
                  className="w-full h-full"
                  width={500}
                  height={500}
                  quality={100}
                />
              </div>
            </div>
          </div>

          <div className="container mx-auto p-4">
            <h6 className="text-[#37474F] font-bold text-base py-5">
              {messages[locale].stats} :
            </h6>
            <div className="flex flex-wrap">
              {data?.stats?.map((val, index: number) => {
                return (
                  <div
                    className="basis-[50%] sm:basis-[15%] p-2 flex justify-center"
                    key={index}
                  >
                    <div
                      className={`relative w-28 h-28 md:w-56 md:h-56 rounded-full border-[1.25rem] md:border-[2rem] flex items-center justify-center flex-shrink-0`}
                      style={{
                        borderColor: `${colors[index % colors.length]}`,
                      }}
                    >
                      <div className="rounded-full flex items-center justify-center">
                        <div className="flex flex-col text-center">
                          <p
                            className=" text-lg md:text-6xl font-bol"
                            style={{
                              color: `${colors[index % colors.length]}`,
                            }}
                          >
                            {val.base_stat}
                          </p>
                          <p className=" text-sm md:text-xl text-[#37474F]">
                            {val?.stat?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="container mx-auto p-4">
            <h6 className="text-[#37474F] font-bold text-base py-5">
              {messages[locale].evolution} :
            </h6>
            <div className="flex flex-wrap justify-center">
              <div className="lg:w-[45%] flex justify-center md:justify-end">
                <div className="flex justify-start">
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden border-[1rem] border-[#689F38]">
                      <Image
                        src={
                          data?.sprites?.other?.home?.front_default ?? pokKind
                        }
                        alt="Hero 1"
                        className="w-full h-full"
                        width={500}
                        height={500}
                        quality={100}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <ArrowForwardIcon sx={{ fontSize: 70, color: "#37474F" }} />
                </div>
                <div className="p-2 flex justify-end">
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden border-[1rem] border-[#304FFE]">
                      <Image
                        src={
                          data?.sprites?.other!["official-artwork"]
                            ?.front_shiny ?? pokKind
                        }
                        alt="Hero 2"
                        className="w-full h-full"
                        width={500}
                        height={500}
                        quality={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-[10%] hidden md:flex justify-center">
                <div className="flex items-center">
                  <ArrowForwardIcon sx={{ fontSize: 70, color: "#37474F" }} />
                </div>
              </div>
              <div className="lg:w-[45%] flex justify-start">
                <div className="flex">
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden border-[1rem] border-[#FBC02D]">
                      <Image
                        src={
                          data?.sprites?.other!["official-artwork"]
                            ?.front_default ?? pokKind
                        }
                        alt="Hero 3"
                        className="w-full h-full"
                        width={500}
                        height={500}
                        quality={100}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <ArrowForwardIcon sx={{ fontSize: 70, color: "#37474F" }} />
                </div>
                <div className="p-2 flex">
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden border-[1rem] border-[#E53935]">
                      <Image
                        src={
                          data?.sprites?.other!["official-artwork"]
                            ?.front_shiny ?? pokKind
                        }
                        alt="Hero 4"
                        className="w-full h-full"
                        width={500}
                        height={500}
                        quality={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
