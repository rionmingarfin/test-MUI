import styled from "@emotion/styled";
import { Pagination } from "@mui/material";
import React from "react";

interface CustomPaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  siblingCount: number;
  boundaryCount: number;
  borderColor: string;
  selectedBackgroundColor: string;
  selectedColor: string;
}

const StyledPagination = styled(Pagination, {
  shouldForwardProp: (prop) =>
    prop !== "borderColor" &&
    prop !== "selectedBackgroundColor" &&
    prop !== "selectedColor",
})<{
  borderColor: string;
  selectedBackgroundColor: string;
  selectedColor: string;
}>`
  & .MuiPaginationItem-outlined {
    border-color: ${({ borderColor }) => borderColor};
    color: ${({ borderColor }) => borderColor};
  }
  & .MuiPaginationItem-page.Mui-selected {
    background-color: ${({ selectedBackgroundColor }) =>
      selectedBackgroundColor};
    color: ${({ selectedColor }) => selectedColor};
  }
`;

const CustomPagination: React.FC<CustomPaginationProps> = ({
  count,
  page,
  onChange,
  siblingCount,
  boundaryCount,
  borderColor,
  selectedBackgroundColor,
  selectedColor,
}) => {
  return (
    <StyledPagination
      variant="outlined"
      shape="rounded"
      count={count}
      page={page}
      onChange={onChange}
      siblingCount={siblingCount}
      boundaryCount={boundaryCount}
      borderColor={borderColor}
      selectedBackgroundColor={selectedBackgroundColor}
      selectedColor={selectedColor}
    />
  );
};

export default CustomPagination;
