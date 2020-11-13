import { Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export default makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export const StyledCard = styled.div`
  cursor: pointer;
`;
export const StyledCardImage = styled.div`
  width: 100%;
  height: 155px;
  background-image: url(${(props) => props.image || ""});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
`;
export const StyledCardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 12px 0
`;

export const StyledTypography = styled(Typography)`
  margin-bottom: 16px;
`;
