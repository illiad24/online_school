import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router";

function WhySection() {
    return (
        <Container maxWidth='lg'
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: { xs: "column-reverse", md: "row" },
                gap: { xs: 4, md: 0 },
                py: "5rem",
            }}
        >
            {/* Image block */}
            <Box
                sx={{
                    flex: { md: "0 0 55%" },
                    width: { xs: "100%", md: "55%" },
                    paddingRight: { xs: '0', md: '2rem' },
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    component="img"
                    src="/why.jpg"
                    alt="Онлайн школа VT"
                    sx={{
                        width: "100%",
                        maxWidth: 500,
                        borderRadius: 2,
                        display: "block",
                    }}
                />
            </Box>

            {/* Text block */}
            <Box
                sx={{
                    flex: { md: "0 0 45%" },
                    width: { xs: "100%", md: "45%" },
                    paddingLeft: { xs: 0, md: "2rem" },
                    textAlign: { xs: "center", md: "left" },
                }}
            >
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

                <Link
                    className="button"
                    to={navigateRoutes.navigate.about.main}
                >
                    Дізнатися більше про нас
                </Link>
            </Box>
        </Container>
    );
}

export default WhySection;
