"use client";
import { useState, useEffect, useContext, ChangeEvent } from "react";
import Image from "next/image";
import axios from "axios";
import pokKind from "@/assets/image/kind.png";
import { useSearchParams, useRouter } from "next/navigation";
import CustomPagination from "@/components/pagination";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Button from "@mui/material/Button";
import { useTheme, useMediaQuery } from "@mui/material";
import { colors } from "@/utils/colorPicker";
import Circle from "@/components/circle";
import CustomSelect from "@/components/select";
import CustomBadge from "@/components/badge";
import { TStatePokemonType, TStateType } from "@/models/pokemontype";
import Layout from "@/components/layout";
import { GlobalContext } from "@/context/globalState";
import LoadingScreen from "@/components/loading";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { messages, locale } = useContext(GlobalContext);

  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get("url");

  const [selectedType, setSelectedType] = useState("normal");
  const [dataTypes, setDataTypes] = useState<TStateType[]>([]);
  const [dataDetailTypes, setDetailType] = useState<TStatePokemonType[]>([]);

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/type/`);
        setDataTypes(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    if (!url) return;
    setSelectedType(url);
  }, [url]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/type/${selectedType}`
        );
        const detailTypes = await Promise.all(
          data?.pokemon?.map(
            async (items: { pokemon: { name: string; url: string } }) => {
              const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${items.pokemon?.name}` //
              );
              return {
                type: data?.name,
                name: items.pokemon?.name,
                url: items?.pokemon.url,
                detail: response.data,
              };
            }
          )
        );
        setDetailType(detailTypes);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedType]);

  const handleChange = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };
  const handleDoublePage = () => {
    setPage(page + 5);
  };
  const handleDoublePageMin = () => {
    const pageData = page - 5 > 0 ? page - 5 : 1;
    setPage(pageData);
  };

  const paginatedData = dataDetailTypes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleChangeLimit = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as number;
    if (value >= 0) {
      setItemsPerPage(value);
    }
  };
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row relative overflow-hidden">
        <Circle
          className="absolute right-[-15%] top-[10%]"
          type={selectedType}
        />
        {/* Sidebar */}
        <aside className="lg:w-1/4 w-full bg-white p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-[#37474F]">
            {messages[locale].typePokemon}
          </h2>
          {isMobile ? (
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              size="small"
              sx={{
                color: "#FF1744",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FF1744",
                  borderRadius: 3,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FF1744",
                },
                ".MuiSelect-icon": { color: "#FF1744" },
              }}
            >
              {dataTypes.map((type, num: number) => (
                <MenuItem value={type.name} key={num}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <ul>
              {dataTypes?.map((type, itype: number) => {
                const name =
                  type?.name?.charAt(0).toUpperCase() +
                  type?.name?.slice(1).toLowerCase();
                return (
                  <li
                    key={itype}
                    onClick={() => setSelectedType(type.name)}
                    className={`cursor-pointer py-2 px-4 mb-2 rounded-lg text-base ${
                      selectedType === type?.name
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-[#37474F]"
                    } hover:bg-gray-200`}
                  >
                    {name}
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        <main className="lg:flex-1 w-full p-6 lg:p-8 relative">
          <h1 className="text-2xl font-bold mb-6 text-[#37474F]">
            {messages[locale].pokemonWith} {selectedType}
          </h1>
          {loading ? (
            <LoadingScreen />
          ) : (
            <div className=" overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-[#37474F]">
                <tbody>
                  {paginatedData.map((pokemon, indexD: number) => {
                    return (
                      <tr
                        className="bg-white bg-opacity-50 rounded-lg  p-4 lg:p-6 border-b-2 cursor-pointer"
                        key={indexD}
                        onClick={() =>
                          router.push(`/detail/${pokemon?.detail?.id}`)
                        }
                      >
                        <td className="px-10 py-10 border-r-2 relative">
                          <Image
                            src={
                              pokemon?.detail?.sprites?.other?.home
                                ?.front_default ?? pokKind
                            }
                            alt={`home index ${indexD}`}
                            fill
                            quality={100}
                            priority
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "contain" }}
                          />
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-semibold text-lg whitespace-nowrap border-r-2"
                        >
                          #{pokemon?.detail?.id}
                        </td>
                        <td className="px-6 py-4 border-r-2 font-bold text-lg">
                          {pokemon.detail?.name}
                        </td>
                        <td className="px-6 py-4 flex flex-wrap gap-2">
                          {pokemon.detail?.types.map((type, i: number) => (
                            <CustomBadge
                              key={i}
                              backgroundColor={colors[i % colors.length]}
                            >
                              {type.type.name}
                            </CustomBadge>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex flex-row flex-wrap gap-4 justify-between m-5 relative">
                <div className="flex">
                  <div className="flex justify-center items-center mr-2 md:mr-10">
                    <p className="text-[#FF1744] font-bold text-base">
                      {messages[locale].page}:
                    </p>
                  </div>
                  <CustomSelect
                    itemsPerPage={itemsPerPage}
                    handleChange={handleChangeLimit}
                    borderColor="#FF1744"
                  />
                </div>

                <div className="flex flex-row md:justify-center items-center w-full md:w-fit order-first md:order-none">
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "red",
                      color: "red",
                      borderWidth: 1,
                      padding: 0.4,
                      margin: 0,
                      minWidth: "auto",
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: "red",
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                      },
                      "& .MuiSvgIcon-root": { margin: 0 },
                    }}
                    disabled={page <= 1}
                    onClick={handleDoublePageMin}
                  >
                    <KeyboardDoubleArrowLeftIcon />
                  </Button>
                  <CustomPagination
                    count={Math.ceil(dataDetailTypes.length / itemsPerPage)}
                    page={page}
                    onChange={handleChange}
                    siblingCount={isMobile ? 0 : 1}
                    boundaryCount={isMobile ? 1 : 2}
                    borderColor="#FF1744"
                    selectedBackgroundColor="#FF1744"
                    selectedColor="white"
                  />
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "red",
                      color: "red",
                      borderWidth: 1,
                      padding: 0.4,
                      margin: 0,
                      minWidth: "auto",
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: "red",
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                      },
                      "& .MuiSvgIcon-root": { margin: 0 },
                    }}
                    onClick={handleDoublePage}
                    disabled={
                      page >= Math.ceil(dataDetailTypes.length / itemsPerPage)
                    }
                  >
                    <KeyboardDoubleArrowRightIcon />
                  </Button>
                </div>

                <div className="flex justify-center items-center">
                  <p className="text-[#FF1744] text-md font-bold pr-2 md:pr-5">
                    {messages[locale].total}:
                  </p>
                  <p className="text-[#FF1744] text-md font-bold md:pr-5">
                    {dataDetailTypes?.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
