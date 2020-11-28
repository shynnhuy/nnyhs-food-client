import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  commitments: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.only("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
}));

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

const Commitments = () => {
  const classes = useStyles();
  return (
    <div className={classes.commitments}>
      <CommitItem>
        <i className="fad fa-shield-check fa-fw"></i>
        <CommitItemTypo variant="h6">Security policy</CommitItemTypo>
      </CommitItem>
      <CommitItem>
        <i className="fad fa-shipping-fast fa-fw"></i>
        <CommitItemTypo variant="h6">Shipping policy</CommitItemTypo>
      </CommitItem>
      <CommitItem>
        <i className="fad fa-undo fa-fw"></i>
        <CommitItemTypo variant="h6">Return policy</CommitItemTypo>
      </CommitItem>
    </div>
  );
};

export default Commitments;
