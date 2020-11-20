import { Paper } from "@material-ui/core";
import styled from "styled-components";

export const StyledCardContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 5%;
`;

export const StyledCardTitle = styled.h3`
  margin: 5px 0;
  width: 100%;
  text-align: center;
`;

export const Divider = styled.div`
  height: 1px;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.2);
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  margin-inline-start: auto;
  margin-inline-end: auto;
  /* margin: 0; */
`;
