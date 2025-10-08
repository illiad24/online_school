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
                    Хто ми
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
                    Чому саме VT?
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: "text.secondary",
                        lineHeight: 1.7,
                        mb: 3,
                    }}
                >
                    Ми — сучасна онлайн-школа, яка допомагає учням розвивати свої знання
                    та досягати високих результатів. Наші викладачі — практикуючі фахівці,
                    які щиро люблять навчати та підтримують кожного учня на шляху до успіху.
                    <br /><br />
                    Ми поєднуємо інноваційні технології навчання з людяністю,
                    увагою та мотивацією, щоб зробити освітній процес цікавим і доступним для всіх.
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
                    Дізнатися більше про нас
                </Button>
            </Box>
        </Box>
    );
}


export default WhySection;