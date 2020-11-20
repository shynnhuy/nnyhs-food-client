import React from "react";
import { useSpring, animated } from "react-spring";
import { StyledCardContainer, StyledCardTitle, Divider } from "./styles";

const lorem = `With all my heart, I love you baby Stay with me, and you will see my
arms will hold you, baby Never leave, 'cause I believe I'm in love.`;

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const AdminCard = ({ title = "Card Title", primary = lorem }) => {
  // const [props, set] = useSpring(() => ({
  //   transform: "scale(1)",
  //   boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.30)",
  //   from: {
  //     transform: "scale(0.5)",
  //     boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.30)",
  //   },
  //   config: {
  //     tension: 400,
  //     mass: 2,
  //     velocity: 5,
  //   },
  // }));
  // const updateHover = (hovering) => ({
  //   transform: `scale(${hovering ? 1.1 : 1})`,
  //   boxShadow: `0px ${
  //     hovering ? "10px 20px" : "5px 15px"
  //   } 0px rgba(0, 0, 0, 0.30)`,
  // });
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const AnimatedStyledCard = animated(StyledCardContainer);
  return (
    <AnimatedStyledCard
      elevation={3}
      // style={props}
      //   onMouseEnter={() => set(updateHover(true))}
      //   onMouseLeave={() => set(updateHover(false))}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
    >
      <StyledCardTitle>{title}</StyledCardTitle>
      <Divider />
      <p>{primary}</p>
    </AnimatedStyledCard>
  );
};

export default AdminCard;
