import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black bg-opacity-50 w-full">
      <CircularProgress color="inherit" />
    </div>
  );
};

export default LoadingScreen;
