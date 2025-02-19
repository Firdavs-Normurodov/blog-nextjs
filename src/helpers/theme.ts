import { Poppins } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#F38D07", // Gold rang
    },
    secondary: {
      main: "#8B7500", // Dark Gold
    },
    background: {
      default: "#121212", // Qora fon
      paper: "#1A1A1A", // Panel background
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#F38D07",
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#F38D07",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#F38D07",
    },
    body1: {
      fontSize: "1rem",
      color: "#b0b0b0",
    },
  },
});

export default theme;
