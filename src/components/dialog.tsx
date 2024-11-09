import React, { FC, MouseEventHandler, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import pokKind from "@/assets/image/kind.png";
import { colors } from "@/utils/colorPicker";
import CustomBadge from "@/components/badge";
import { IStateDataPokemon } from "@/models/pokemon";
import { GlobalContext } from "@/context/globalState";

interface DialogI {
  open: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  data?: IStateDataPokemon;
}

const DialogDetail: FC<DialogI> = ({ open, onClose, data }) => {
  const { messages, locale } = useContext(GlobalContext);
  const name =
    data &&
    data?.name?.charAt(0).toUpperCase() + data?.name?.slice(1).toLowerCase();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={"md"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div className="flex justify-end">
          <IconButton aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-wrap flex-col md:flex-row mb-4">
          <div className="w-full md:w-1/3">
            <Image
              src={data?.detail?.sprites.other?.home?.front_default ?? pokKind}
              alt="Hero Image"
              className="w-full h-full"
              width={500}
              height={500}
              quality={100}
            />
          </div>
          <div className="w-full md:w-2/3 pl-4 flex flex-col justify-between">
            <div>
              <h6 className="font-bold text-2xl text-[#37474F]">{name}</h6>
            </div>
            <div>
              <div className="flex py-4 justify-between md:justify-normal">
                <div className="flex">
                  <p className="font-bold text-[#37474F]">
                    {messages[locale].weight}:
                  </p>
                  <p className="pl-2 md:ml-10 text-[#37474F]">
                    {data?.detail?.weight}
                  </p>
                </div>
                <div className="flex ml-2 md:ml-10">
                  <p className=" font-bold text-[#37474F]">
                    {messages[locale].height}:
                  </p>
                  <p className="pl-2 md:ml-10 text-[#37474F]">
                    {data?.detail?.height}
                  </p>
                </div>
              </div>
              <div className="flex flex-row">
                <p className="font-bold text-[#37474F]">
                  {messages[locale].ability}:
                </p>
                <div className="flex flex-col">
                  {Array.isArray(data?.detail?.abilities) &&
                    data?.detail?.abilities.map((ability, index: number) => (
                      <ul className="ml-10 list-disc" key={index}>
                        <li className="text-[#37474F]">
                          {ability?.ability?.name}
                        </li>
                      </ul>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-row flex-wrap py-4">
              <p className="font-bold pr-2 text-[#37474F]">
                {messages[locale].type} :
              </p>
              <div className="flex">
                {Array.isArray(data?.detail?.types) &&
                  data?.detail?.types?.map((type, index: number) => (
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
            <div className="mt-4">
              <Link href={`/detail/${data?.detail?.id}`} passHref>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#F9A825",
                    "&:hover": { backgroundColor: "#FDD835" },
                    borderRadius: "8px",
                    textTransform: "none",
                  }}
                >
                  {messages[locale].detail}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetail;
