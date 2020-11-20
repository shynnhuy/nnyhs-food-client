import styled from "styled-components";
import { Box, Button, makeStyles, TableCell } from "@material-ui/core";

import img from "assets/img/food-icons-17.png";

export default makeStyles((theme) => ({
  container: {
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
      height: (props) => `calc(100vh - ${props.navheight}px)`,
      maxHeight: (props) => `calc(100vh - ${props.navheight}px)`,
    },
  },
}));

export const StyledCartTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 16px;
`;

export const StyledCheckOutContainer = styled(Box)`
  /* color: white; */
  ${({ theme }) => `
  background-color: ${theme.palette.type === "light" ? "#4e4e53" : "white"};
  height: 100%;
  padding: 30px;
  border-radius: 15px;
  `}
`;

export const StyledTableCellImage = styled(TableCell)`
  width: 100px;
  height: 100px;
`;

export const StyledImageContainer = styled.div`
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl})` : `url(${img})`};
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const StyledTableTextBold = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

export const StyledClearButton = styled(Button)`
  ${({ theme }) => `
    min-width: unset;
    color: ${theme.palette.error.main}
  `}
`;
