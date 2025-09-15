import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        mode: "light",
        // Light blue palette with full scale and action tokens
        primary: {
            light: blue[300],
            main: blue[500],
            dark: blue[700],
            contrastText: "#ffffff",
        },
        secondary: {
            light: "#90caf9",
            main: deepOrange[500],
            dark: "#1769aa",
            contrastText: "#ffffff",
        },
        info: {
            light: blue[200],
            main: blue[400],
            dark: blue[600],
            contrastText: "#ffffff",
        },
        success: {
            light: "#66bb6a",
            main: "#43a047",
            dark: "#2e7d32",
            contrastText: "#ffffff",
        },
        warning: {
            light: "#ffb74d",
            main: "#f57c00",
            dark: "#e65100",
            contrastText: "#1a1a1a",
        },
        error: {
            light: "#ef9a9a",
            main: "#e53935",
            dark: "#b71c1c",
            contrastText: "#ffffff",
        },
        background: {
            default: "#f6f9fc",
            paper: "#ffffff",
        },
        text: {
            primary: "#0d1b2a",
            secondary: "#415a77",
            disabled: "#90a4ae",
        },
        divider: "#e3f2fd",
        action: {
            hover: "rgba(33, 150, 243, 0.08)",
            selected: "rgba(33, 150, 243, 0.16)",
            focus: "rgba(33, 150, 243, 0.24)",
            active: "#1565c0",
            disabled: "rgba(0,0,0,0.38)",
            disabledBackground: "rgba(33, 150, 243, 0.12)",
        },
        custom: {
            // supplemental tokens for UI states
            link: blue[700],
            linkHover: blue[900],
            subtle: blue[50],
            subtleHover: blue[100],
            outlinedBorder: "#bbdefb",
        },
    },
    typography: {
        fontFamily: `"Roboto", "Arial", sans-serif`,
        h1: { fontSize: "2.5rem", fontWeight: 700 },
        h2: { fontSize: "2rem", fontWeight: 600 },
        body1: { fontSize: "1rem" },
        button: { textTransform: "none" },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: "6px 16px",
                    transition: "background-color 120ms ease, box-shadow 120ms ease, color 120ms ease",
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: blue[600],
                        boxShadow: "0 2px 8px rgba(21, 101, 192, 0.24)",
                    },
                    '&:active': {
                        backgroundColor: blue[700],
                    },
                    '&:focus-visible': {
                        boxShadow: "0 0 0 3px rgba(33,150,243,0.35)",
                    },
                },
                textPrimary: {
                    '&:hover': {
                        backgroundColor: "rgba(33, 150, 243, 0.08)",
                    },
                    '&:active': {
                        backgroundColor: "rgba(33, 150, 243, 0.16)",
                    },
                    '&:focus-visible': {
                        boxShadow: "0 0 0 3px rgba(33,150,243,0.35)",
                    },
                },
                outlinedPrimary: {
                    borderColor: "#bbdefb",
                    '&:hover': {
                        backgroundColor: "rgba(33, 150, 243, 0.04)",
                        borderColor: blue[400],
                    },
                    '&:active': {
                        backgroundColor: "rgba(33, 150, 243, 0.12)",
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: blue[700],
                    '&:hover': { color: blue[900] },
                    '&:active': { color: blue[800] },
                    '&:focus-visible': {
                        outline: "none",
                        boxShadow: "0 0 0 3px rgba(33,150,243,0.35)",
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    '&.Mui-selected': {
                        backgroundColor: "rgba(33, 150, 243, 0.16)",
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: "rgba(33, 150, 243, 0.24)",
                    },
                },
            },
        },
    },
});
