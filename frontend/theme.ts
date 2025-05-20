"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    primary: {
      main: "#fe7d5a",
      light: "#ffecec",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00346e",
    },
  },
});

export default theme;
