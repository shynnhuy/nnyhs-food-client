import { makeStyles } from "@material-ui/core";
import Img1 from "assets/img/landing-card1.png";
import Img2 from "assets/img/landing-card2.png";

export default makeStyles((theme) => ({
  Container: {
    display: "flex",
    padding: theme.spacing(4),
    margin: theme.spacing(4, 0),
  },
  Card: {
    borderRadius: theme.spacing(4),
    padding: theme.spacing(4),
    textAlign: "center",
  },
  Left: {
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(4, 0, 0),
    },
    padding: theme.spacing(2),
    "& .imgLeft": {
      backgroundImage: `url(${Img1})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      width: "100%",
      height: "200px",
    },
  },
  Right: {
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(4, 0, 0),
    },
    padding: theme.spacing(2),
    "& .imgRight": {
      backgroundImage: `url(${Img2})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      width: "100%",
      height: "200px",
    },
  },
  title: {
    margin: theme.spacing(2, 0),
  },
}));
