import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router";

function MainSection() {
    return (
        <Container maxWidth='lg'
            component="section"
            sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: '2rem', md: '0' }, alignItems: 'center', minHeight: 'calc(100vh  - 120px)' }}


        >
            <Box sx={{ flex: { xs: 'column', md: '0 0 50%' }, paddingRight: { xs: '0', md: '2rem' }, }}>
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
                    <Link
                        to={navigateRoutes.navigate.about.main}
                        className="button button--border button--inherit main-section-button"
                    >
                        Про нас
                    </Link>

                    <Link
                        className="button main-section-button"
                        to={navigateRoutes.navigate.courses.list}

                    >
                        Записатися на курс
                    </Link>
                </Box>
            </Box>

            <Box sx={{ flex: { xs: 'column', md: '0 0 50%' } }}>
                <Box
                    component="img"
                    src="../../../public/image.svg"
                    alt="Онлайн школа VT"
                    sx={{ width: "100%", mx: "auto", display: "block" }}
                />
            </Box>
        </Container>
    );
}

export default MainSection;
