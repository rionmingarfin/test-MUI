import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";

interface CustomButtonProps {
  backgroundColor: string;
  borderColor?: string;
  children: React.ReactNode;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "backgroundColor" && prop !== "borderColor",
})<{ backgroundColor: string; borderColor?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  &:hover {
    background-color: ${({ backgroundColor }) => backgroundColor};
  }
  border-radius: 20px;
  padding-top: -1px;
  padding-bottom: -1px;
  margin-right: 8px;
  color: white;
  text-transform: none;
  ${({ borderColor }) => borderColor && `border: 1px solid ${borderColor};`}
`;

const CustomButton: React.FC<CustomButtonProps> = ({
  backgroundColor,
  borderColor,
  children,
}) => {
  return (
    <StyledButton backgroundColor={backgroundColor} borderColor={borderColor}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
