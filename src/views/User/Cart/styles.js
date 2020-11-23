import styled from "styled-components";
import {
  Box,
  Button,
  makeStyles,
  TableCell,
  Typography,
} from "@material-ui/core";

import img from "assets/img/food-icons-17.png";

export default makeStyles((theme) => ({
  container: {
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
      // height: (props) => `calc(100vh - ${props.navheight}px)`,
      // maxHeight: (props) => `calc(100vh - ${props.navheight}px)`,
    },
  },
  title: {
    fontSize: "18px",
  },
  total: {
    fontSize: "36px",
    fontWeight: 500,
  },
  shipCost: {
    fontSize: "18px",
    color: "#0a9c5f",
    marginTop: theme.spacing(2),
  },
  checkout: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2),
  },
  commitments: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.only("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
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
  ${({ theme }) => `
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

export const CommitItem = styled(Box)`
  ${({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 7px;
  margin: 5px 0;
  border-left: 6px solid ${theme.palette.primary.main};
  i {
    font-size: 20px;
    color: ${theme.palette.primary.main};
    margin-right: 10px;
    margin-left: 5px;
  }
  `}
`;

export const CommitItemTypo = styled(Typography)`
  font-weight: 500;
  font-size: 16px;
`;
