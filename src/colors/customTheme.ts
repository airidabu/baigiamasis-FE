import { createTheme } from "@mui/material";

export const getCustomTheme = (mode: "light" | "dark") =>
    createTheme({
        palette: {
            mode,
            primary: {
                light: "#f8bbd0",
                main: "#e91e63",
                dark: "#880e4f",
                contrastText: "#fce4ec",
            },
            secondary: {
                light: "#e1bee7",
                main: "#9c27b0",
                dark: "#6a1b9a",
                contrastText: "#f3e5f5",
            }
        }
    });