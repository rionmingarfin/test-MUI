import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress color="inherit" />
    </div>
  );
};

export default LoadingScreen;
