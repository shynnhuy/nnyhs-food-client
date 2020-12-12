import React, { createContext, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { deepOrange, pink, lightBlue, red } from "@material-ui/core/colors";
import SocketProvider from "./SocketContext";
import "assets/scss/fonts/_index.scss";
import "typeface-roboto";
import { ModalProvider } from "./ModalContext";

const ThemeContext = createContext(null);

export function useThemeContext() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a SThemeProvider");
  }

  return context;
}

const SThemeProvider = ({ children }) => {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  // const mainPrimaryColor = darkState ? deepOrange[500] : cyan[700];
  // const mainSecondaryColor = darkState ? "#448aff" : red[400];
  const mainPrimaryColor = darkState ? deepOrange[500] : lightBlue[600];
  const mainSecondaryColor = darkState ? pink[500] : red[400];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
    typography: {
      fontFamily: ["Roboto", "serif"].join(","),
      // fontSize: 14,
      // fontWeightRegular: 400,
      // fontWeightMedium: 600,
      // fontWeightBold: 800,
      // htmlFontSize: 16,
    },
    overrides: {
      MuiFormControl: {
        marginNormal: {
          marginTop: "8px",
        },
      },
      MuiCssBaseline: {
        "@global": {
          // "*::-webkit-scrollbar": {
          //   width: "0.5em",
          // },
          // "*::-webkit-scrollbar-track": {
          //   "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0, 0.85)",
          // },
          // "*::-webkit-scrollbar-thumb": {
          //   backgroundColor: "rgba(0,0,0,.1)",
          //   outline: "1px solid slategrey",
          // },
          a: {
            color: "unset",
          },
        },
      },
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, darkState, handleThemeChange }}>
      <ThemeProvider theme={darkTheme}>
        <StyledThemeProvider theme={darkTheme}>
          <SocketProvider>
            <ModalProvider>{children}</ModalProvider>
          </SocketProvider>
        </StyledThemeProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default SThemeProvider;
