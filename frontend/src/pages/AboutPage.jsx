import React from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    Button,
    Stack,
    Divider,
    useTheme,
} from '@mui/material';
import {
    School,
    VerifiedUser,
    Lightbulb,
    People,
    ArrowForward,
} from '@mui/icons-material';
import { Link } from 'react-router'; // Припускаємо, що використовується react-router

// Акцентний колір (можна взяти з вашого попереднього коду)
const ACCENT_COLOR = "#1976d2";

/**
 * 1. Секція: Герой (Вступ)
 */
const HeroSection = ({ theme }) => (
    <Box
        sx={{
            py: 8,
            mb: 4,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${ACCENT_COLOR}e0 0%, ${ACCENT_COLOR} 100%)`,
            color: 'white',
            borderRadius: '0 0 40px 40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}
    >
        <Container maxWidth="md">
            <Typography variant="h2" component="h1" fontWeight={900} mb={2}>
                Наша Місія: Навчати. Надихати. Змінювати.
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
                Ми — це освітня платформа, створена професіоналами для тих, хто прагне стати найкращим у цифровій епосі. Наша мета — надати вам знання, що мають реальну цінність.
            </Typography>
            <Button
                component={Link}
                to="/courses"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                    backgroundColor: 'white',
                    color: ACCENT_COLOR,
                    '&:hover': { backgroundColor: '#f0f0f0' },
                    borderRadius: '50px',
                    fontWeight: 700
                }}
            >
                Перейти до курсів
            </Button>
        </Container>
    </Box>
);

/**
 * 2. Секція: Наші Цінності
 */
const ValuesSection = () => {
    const values = [
        { icon: <Lightbulb sx={{ color: ACCENT_COLOR, fontSize: 40 }} />, title: "Інноваційність", description: "Ми постійно оновлюємо наші матеріали, щоб ви вивчали лише найактуальніші технології." },
        { icon: <VerifiedUser sx={{ color: ACCENT_COLOR, fontSize: 40 }} />, title: "Якість знань", description: "Усі курси розроблені провідними спеціалістами з багаторічним досвідом у галузі." },
        { icon: <People sx={{ color: ACCENT_COLOR, fontSize: 40 }} />, title: "Спільнота", description: "Ми створюємо дружнє середовище, де учні можуть обмінюватися досвідом та підтримувати один одного." },
    ];

    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h4" component="h2" align="center" fontWeight={700} mb={5}>
                Чому обирають нас?
            </Typography>
            <Grid container spacing={4}>
                {values.map((item, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Paper
                            elevation={6} // Більш виразна тінь
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                height: '100%',
                                borderRadius: '20px',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: `0 15px 30px ${ACCENT_COLOR}20`
                                }
                            }}
                        >
                            <Box mb={2}>{item.icon}</Box>
                            <Typography variant="h6" fontWeight={800} mb={1}>
                                {item.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {item.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

/**
 * 3. Секція: Наша Історія (Timeline / Простий текст)
 */
const HistorySection = () => (
    <Box sx={{ py: 6, backgroundColor: '#f9f9f9' }}>
        <Container maxWidth="md">
            <Typography variant="h4" component="h2" align="center" fontWeight={700} mb={4}>
                Як ми починали
            </Typography>

            <Stack spacing={3} divider={<Divider orientation="horizontal" flexItem sx={{ my: 2 }} />}>
                <Box>
                    <Typography variant="subtitle1" color={ACCENT_COLOR} fontWeight={700}>2018: Заснування</Typography>
                    <Typography variant="body1">Ідея створення народилася з потреби у якісній практичній освіті, недоступній у традиційних закладах. Ми запустили перші 3 пілотні курси.</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" color={ACCENT_COLOR} fontWeight={700}>2021: Масштабування</Typography>
                    <Typography variant="body1">Наша спільнота перевищила 10 000 студентів. До команди приєдналися провідні інженери та дизайнери, розширивши каталог до 50+ курсів.</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" color={ACCENT_COLOR} fontWeight={700}>Сьогодні: Ваш Шлях</Typography>
                    <Typography variant="body1">Ми продовжуємо зростати, фокусуючись на інтерактивних проєктах та менторській підтримці. Ваше майбутнє починається тут.</Typography>
                </Box>
            </Stack>
        </Container>
    </Box>
);

/**
 * 4. Секція: Заклик до Дії (CTA)
 */
const CtaSection = () => (
    <Box sx={{ py: 8, textAlign: 'center', mb: 4 }}>
        <Container maxWidth="sm">
            <Typography variant="h5" component="h3" fontWeight={800} mb={2}>
                Готові розпочати навчання?
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
                Приєднуйтесь до тисяч успішних випускників, які вже досягли своїх кар'єрних цілей з нашою допомогою.
            </Typography>
            <Button
                component={Link}
                to="/signup"
                variant="outlined"
                size="large"
                sx={{
                    color: ACCENT_COLOR,
                    borderColor: ACCENT_COLOR,
                    borderRadius: '50px',
                    fontWeight: 700,
                    p: '10px 30px'
                }}
            >
                Приєднатися
            </Button>
        </Container>
    </Box>
);


function AboutPage() {
    const theme = useTheme();

    return (
        <Container maxWidth="lg">
            <HeroSection theme={theme} />
            <ValuesSection />
            <HistorySection />
            <CtaSection />
        </Container>
    );
}

export default AboutPage;