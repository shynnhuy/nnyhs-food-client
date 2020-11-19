import React from "react";
import { StyledCardContainer } from "./styles";

const lorem = `With all my heart, I love you baby Stay with me, and you will see my
arms will hold you, baby Never leave, 'cause I believe I'm in love.`;

const AdminCard = ({ title = "Card Title", primary = lorem }) => {
  return (
    <StyledCardContainer elevation={3}>
      <h3>{title}</h3>
      <p>{primary}</p>
    </StyledCardContainer>
  );
};

export default AdminCard;
