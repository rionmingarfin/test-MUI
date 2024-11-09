import React, { FC, MouseEventHandler } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import Image from "next/image";
import imgPokemon from "@/assets/image/pokemon.jpg";

interface DialogI {
  open: boolean;
  onClose: MouseEventHandler<HTMLElement>;
}

const WelcomeMessage: FC<DialogI> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="welcome-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="welcome-dialog-title" sx={{ color: "#37474F" }}>
        Welcome to the Pokémon World!
      </DialogTitle>
      <DialogContent dividers>
        <div style={{ textAlign: "center" }}>
          <Image
            src={imgPokemon}
            alt="welcome pokemon"
            className="w-full h-full"
            width={500}
            height={500}
            quality={100}
          />
          <Typography variant="h5" sx={{ color: "#37474F" }}>
            Catch them all and embark on an exciting adventure!
          </Typography>
        </div>
      </DialogContent>
      <DialogActions sx={{ margin: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#F9A825",
            "&:hover": { backgroundColor: "#FDD835" },
            borderRadius: "8px",
            textTransform: "none",
          }}
          onClick={onClose}
        >
          browse pokémon
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WelcomeMessage;
