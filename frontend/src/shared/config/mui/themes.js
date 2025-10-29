import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            light: '#027af2',
            main: blue[500],
            dark: '#47536b',
            contrastText: "#ffffff",
        },
        secondary: {
            light: "#90caf9",
            main: deepOrange[500],
            dark: "#1769aa",
            contrastText: "#ffffff",
        },

    },
    typography: {
        fontFamily: `"Roboto", "Arial", sans-serif`,
        h1: { fontSize: "2.5rem", fontWeight: 700 },
        h2: { fontSize: "2rem", fontWeight: 600 },
        body1: { fontSize: "1rem" },
        button: { textTransform: "none" },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'inherit',
                    // backdropFilter: 'blur(24px)',
                    // borderRadius: '16px',
                    boxShadow: 'none',
                },
            },
        },
        MuiLink: {
            defaultProps: {
                underline: "none",
                color: "inherit",
            },
        },
    },

});


// background: #afdbfc;
// background: #63a8da;
// background: #205e8c;
// background: #ffd15f;
// background: #fff4ce;
// background: #fff;

