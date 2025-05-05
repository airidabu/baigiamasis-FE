import { createContext, useContext, ReactNode, useState } from "react";
import { getCustomTheme } from "../colors/customTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";

type ThemeContextType = {
    themeMode: "light" | "dark";
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderWithContext = ({ children }: { children: ReactNode }) => {
    const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    const theme = getCustomTheme(themeMode);

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeContext must be used within a ThemeProviderWithContext");
    }
    return context;
};