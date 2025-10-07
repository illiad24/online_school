import { Box, Button, Typography } from "@mui/material";
function WhySection() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', py: '5rem' }}>
            <Box sx={{ flex: "0 0 55%" }}>
                <Box
                    component="img"
                    src="../../../public/why.jpg"
                    alt="Онлайн школа VT"
                    sx={{ width: "100%", maxWidth: 500, mx: "auto", display: "block" }}
                />
            </Box>
            <Box sx={{ flex: "0 0 45%", marginLeft: '2rem' }}>
                <Typography
                    variant="overline"
                    sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                    }}
                >
                    Who we are
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: "2rem", md: "2.5rem" },
                        mt: 2,
                        mb: 3,
                    }}
                >
                    Why Createx?
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: "text.secondary",
                        lineHeight: 1.7,
                        mb: 3,
                    }}
                >
                    A fermentum in morbi pretium aliquam adipiscing donec tempus.
                    Vulputate placerat amet pulvinar lorem nisl. Consequat feugiat
                    habitant gravida quisque elit bibendum id adipiscing sed. Etiam
                    duis lobortis in fames ultrices commodo nibh. Tincidunt sagittis
                    neque sem ac eget. Ultricies amet justo et eget quisque purus
                    vulputate dapibus tortor.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                    }}
                >
                    More about us
                </Button>
            </Box>
        </Box>
    );
}

export default WhySection;