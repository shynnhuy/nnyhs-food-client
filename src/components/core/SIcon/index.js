import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

export default ({
  className,
  primary,
  secondary = undefined,
  style = undefined,
}) => {
  const useStyles = makeStyles((theme) => ({
    icon: {
      // color: theme.palette.primary.main,
      // "--fa-primary-color": ({ primary }) =>
      //   primary && theme.palette.secondary.main,
      // "--fa-secondary-color": ({ secondary }) =>
      //   secondary ? theme.palette.secondary.main : "dimgray",
    },
  }));
  // React.useEffect(() => {
  //   const node = loadCSS(
  //     "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
  //     document.getElementById("root")
  //   );

  //   return () => {
  //     node.parentNode.removeChild(node);
  //   };
  // }, []);
  const classes = useStyles({ primary, secondary });
  return <i className={clsx("fad", className, classes.icon)} style={style} />;
};
