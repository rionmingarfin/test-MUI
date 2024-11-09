import React, { FC } from "react";
import { colors } from "@/utils/colorPicker";

interface circleI {
  className: string;
  type: string;
}
const Circle: FC<circleI> = ({ className, type }) => {
  return (
    <div
      className={`${className} hidden md:flex w-96 h-96 rounded-full border-[1.25rem] md:border-[7rem]`}
      style={{
        borderColor: colors[type.length % colors.length],
      }}
    ></div>
  );
};

export default Circle;
