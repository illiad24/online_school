import { Box, Grid, Typography, Button } from "@mui/material";

function MainSection() {
    return (
        <Box
            component="section"
            sx={{ display: 'flex', alignItems: 'center', }}
        >
            <Box sx={{ flex: "0 0 55%", marginRight: '2rem' }}>
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: "2rem", md: "3rem", },
                        mb: 3,

                    }}
                >
                    Онлайн школа <Typography component="span" color="primary" fontSize={'56px '} fontWeight={700}>VT</Typography>
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: "1.125rem",
                        color: "text.secondary",
                        lineHeight: 1.6,
                        mb: 4,
                    }}
                >
                    Сучасна освіта, що відкриває нові можливості.
                    Наші курси допоможуть вам отримати актуальні знання
                    та впевнено рухатися до своєї мети.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Button
                        variant="outlined"
                        size="large"
                        sx={{
                            borderWidth: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                            "&:hover": { borderWidth: 2 },
                        }}
                    >
                        Про нас
                    </Button>

                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                        }}
                    >
                        Записатися на курс
                    </Button>
                </Box>
            </Box>

            <Box sx={{ flex: "0 0 45%" }}>
                <Box
                    component="img"
                    src="../../../public/image.svg"
                    alt="Онлайн школа VT"
                    sx={{ width: "100%", maxWidth: 500, mx: "auto", display: "block" }}
                />
            </Box>
        </Box>
    );
}

export default MainSection;
