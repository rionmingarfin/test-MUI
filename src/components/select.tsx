import styled from "@emotion/styled";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React from "react";

interface CustomSelectProps {
  itemsPerPage: number;
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  borderColor: string;
}

const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== "borderColor",
})<{ borderColor: string }>`
  color: ${({ borderColor }) => borderColor};
  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ borderColor }) => borderColor};
    border-radius: 3px;
  }
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ borderColor }) => borderColor};
  }
  .MuiSelect-icon {
    color: ${({ borderColor }) => borderColor};
  }
`;

const CustomSelect: React.FC<CustomSelectProps> = ({
  itemsPerPage,
  handleChange,
  borderColor,
}) => {
  return (
    <StyledSelect
      value={itemsPerPage}
      onChange={handleChange}
      size="small"
      borderColor={borderColor}
    >
      <MenuItem value={5}>5</MenuItem>
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={20}>20</MenuItem>
      <MenuItem value={30}>30</MenuItem>
    </StyledSelect>
  );
};

export default CustomSelect;
