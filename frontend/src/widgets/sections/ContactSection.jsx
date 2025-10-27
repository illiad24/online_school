import { Box, Button, Typography, TextField } from "@mui/material";

function ContactSection() {
    return (
        <Box
            sx={{
                textAlign: "center",
                py: "6rem",
                background: "linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 100%)", // синій пастельний градієнт
                position: "relative",
            }}
        >
            <Typography
                variant="overline"
                sx={{
                    fontWeight: 700,
                    color: "#0D47A1", // темно-синій
                    letterSpacing: 1,
                    mb: 1,
                    display: "block",
                }}
            >
                Не пропусти нічого важливого
            </Typography>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 800,
                    mb: 4,
                    color: "#0D47A1",
                }}
            >
                Підпишись на новини школи VT
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                    maxWidth: 600,
                    mx: "auto",
                }}
            >
                <TextField
                    placeholder="Введіть вашу електронну адресу"
                    variant="outlined"
                    sx={{
                        flexGrow: 1,
                        backgroundColor: "#fff",
                        borderRadius: 1,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                        },
                    }}
                />
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: "8px",
                        background: "linear-gradient(90deg, #1976D2 0%, #0D47A1 100%)",
                        "&:hover": {
                            background: "linear-gradient(90deg, #0D47A1 0%, #1976D2 100%)",
                        },
                    }}
                >
                    Підписатися
                </Button>
            </Box>
        </Box>
    );
}

export default ContactSection;
