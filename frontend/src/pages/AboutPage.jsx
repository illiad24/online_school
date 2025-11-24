import React from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    Divider,
    Button,
    useTheme,
    useMediaQuery,
    Stack,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    Star,
    EmojiEvents,
    Person,
    TrendingUp,
    RocketLaunch,
    ChevronRight,
    CheckCircle,
    Gavel,
    AutoStories,
    Lightbulb,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Стилізований компонент для іконок
const IconWrapper = styled(Box)(({ theme, color = theme.palette.primary.main }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: `${color}10`,
    color: color,
    marginBottom: theme.spacing(2),
    minWidth: 60, // Фіксована ширина для ListItems
    transition: '0.3s ease-in-out',
    '& svg': {
        fontSize: 32,
    },
}));

function AboutPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // Преміальні кольори
    const ACCENT_COLOR = "#0069d9"; // Глибокий синій (для кнопок/заголовків)
    const SECONDARY_COLOR = "#28a745"; // Зелений (для підтверджень)
    const BORDER_COLOR = "#e0e7f1";
    const BG_SECONDARY = "#f8f9fa"; // Світло-сірий для контрастної секції

    return (
        <Box sx={{ flexGrow: 1, background: '#ffffff' }}>
            <Container maxWidth="lg" sx={{ pt: 6, pb: 8 }}>

                {/* =======================================================
                   СЕКЦІЯ 1: ГЕРОЙ І МІСІЯ (СТРУКТУРОВАНО)
                   ======================================================= */}
                <Grid container spacing={isMobile ? 4 : 8} alignItems="center" sx={{ py: 6 }}>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, mb: 1, color: ACCENT_COLOR, textTransform: 'uppercase' }}
                        >
                            Ласкаво просимо до VT
                        </Typography>
                        <Typography
                            variant={isTablet ? "h3" : "h2"}
                            component="h1"
                            sx={{ fontWeight: 900, mb: 3, color: '#333' }}
                        >
                            Місце, де <Box component="span" sx={{ color: ACCENT_COLOR }}>Навички Перетворюються</Box> на Капітал
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 4, lineHeight: 1.7 }}
                        >
                            Ми — це більше, ніж просто онлайн-школа. Ми — ваш стратегічний партнер у світі технологій. Наша місія — не просто дати знання, а створити професіоналів, готових до викликів завтрашнього дня.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<RocketLaunch />}
                            sx={{
                                borderRadius: '10px',
                                py: 1.2,
                                px: 4,
                                fontWeight: 700,
                                background: ACCENT_COLOR,
                                boxShadow: `0 4px 15px ${ACCENT_COLOR}40`,
                            }}
                        >
                            Розпочати Трансформацію
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                        {/* Місце для зображення або ілюстрації */}
                        <Paper elevation={6} sx={{ height: isMobile ? 250 : 350, width: '100%', background: `url(https://via.placeholder.com/600x400/1e88e5/ffffff?text=VT+Success) center/cover`, borderRadius: '16px' }} />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 8, borderColor: BORDER_COLOR }} />

                {/* =======================================================
                   СЕКЦІЯ 2: КЛЮЧОВІ ПЕРЕВАГИ (ПРОДАЮЧИЙ ТЕКСТ)
                   ======================================================= */}
                <Box sx={{ py: 6, textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 800, mb: 2, color: '#333' }}
                    >
                        Ваші Гарантії Успіху з VT
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 6, maxWidth: 900, mx: 'auto' }}
                    >
                        Ми не обіцяємо, ми забезпечуємо результат завдяки трьом стовпам нашої освітньої філософії.
                    </Typography>
                    <Grid container spacing={4}>

                        {[
                            { icon: EmojiEvents, title: "100% Практика", text: "Відкиньте застарілі підручники. Наші курси базуються на вирішенні реальних завдань, які ви зустрінете на роботі. Жодних лекцій – тільки робочі проєкти." },
                            { icon: Person, title: "Елітні Ментори", text: "Вас навчають тільки діючі Senior-спеціалісти з провідних ІТ-компаній. Вони знають, що актуально сьогодні, і готові ділитися інсайтами." },
                            { icon: TrendingUp, title: "Кар'єрна Інтеграція", text: "Ми допомагаємо не тільки навчитися, але й знайти першу роботу. Від рев'ю резюме до підготовки до співбесід – повний кар'єрний супровід." },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper elevation={4} sx={{ p: 4, borderRadius: '16px', height: '100%', '&:hover': { boxShadow: '0 12px 30px rgba(0,0,0,0.15)' } }}>
                                    <IconWrapper color={ACCENT_COLOR}>
                                        <item.icon />
                                    </IconWrapper>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#333' }}>{item.title}</Typography>
                                    <Typography variant="body1" color="text.secondary">{item.text}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider sx={{ my: 8, borderColor: BORDER_COLOR }} />

                {/* =======================================================
                   СЕКЦІЯ 3: НАШ ПРОЦЕС (ДОВІРА І ЛОГІКА)
                   ======================================================= */}
                <Box sx={{ py: 6, background: BG_SECONDARY, borderRadius: '20px', p: isMobile ? 4 : 8 }}>
                    <Grid container spacing={isMobile ? 4 : 8} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h4"
                                sx={{ fontWeight: 800, mb: 3, color: ACCENT_COLOR }}
                            >
                                Як працює успіх у VT?
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 4, lineHeight: 1.7 }}
                            >
                                Ми розробили прозору та ефективну модель навчання, яка гарантує, що ви не загубитеся на жодному етапі. Ваш час – наш пріоритет.
                            </Typography>
                            <List>
                                <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                                    <IconWrapper color={SECONDARY_COLOR}>
                                        <AutoStories />
                                    </IconWrapper>
                                    <ListItemText primary={<Typography variant="h6" sx={{ fontWeight: 700 }}>Спланований Трек</Typography>} secondary="Чітка дорожня карта від початківця до Senior-рівня, без зайвої води." />
                                </ListItem>
                                <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                                    <IconWrapper color={SECONDARY_COLOR}>
                                        <Lightbulb />
                                    </IconWrapper>
                                    <ListItemText primary={<Typography variant="h6" sx={{ fontWeight: 700 }}>Активний Фідбек</Typography>} secondary="Щоденна перевірка домашніх завдань та персоналізовані поради від менторів." />
                                </ListItem>
                                <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                                    <IconWrapper color={SECONDARY_COLOR}>
                                        <Gavel />
                                    </IconWrapper>
                                    <ListItemText primary={<Typography variant="h6" sx={{ fontWeight: 700 }}>Офіційна Сертифікація</Typography>} secondary="Сертифікат, визнаний роботодавцями, після успішного захисту фінального проєкту." />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                            {/* Місце для другої ілюстрації */}
                            <Paper elevation={6} sx={{ height: isMobile ? 250 : 400, width: '100%', background: `url(https://via.placeholder.com/600x400/4CAF50/ffffff?text=VT+Process) center/cover`, borderRadius: '16px' }} />
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ my: 8, borderColor: BORDER_COLOR }} />

                {/* =======================================================
                   СЕКЦІЯ 4: ФАКТИ І ЗАКЛИК ДО ДІЇ (CTA)
                   ======================================================= */}
                <Box sx={{ py: 6, textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 800, mb: 5, color: '#333' }}
                    >
                        Наші Цифри Говорять Самі За Себе
                    </Typography>
                    <Grid container spacing={isMobile ? 3 : 6}>
                        {/* Факт 1 */}
                        <Grid item xs={6} md={3}>
                            <Typography variant="h3" sx={{ fontWeight: 900, color: ACCENT_COLOR }}>94%</Typography>
                            <Typography variant="subtitle1" color="text.secondary">Працевлаштовані протягом 6 міс.</Typography>
                        </Grid>
                        {/* Факт 2 */}
                        <Grid item xs={6} md={3}>
                            <Typography variant="h3" sx={{ fontWeight: 900, color: ACCENT_COLOR }}>4.95</Typography>
                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} sx={{ color: '#ffc107' }}>
                                <Star /><Star /><Star /><Star /><Star />
                            </Stack>
                            <Typography variant="subtitle1" color="text.secondary">Середній Рейтинг Курсів</Typography>
                        </Grid>
                        {/* Факт 3 */}
                        <Grid item xs={6} md={3}>
                            <Typography variant="h3" sx={{ fontWeight: 900, color: ACCENT_COLOR }}>2000+</Typography>
                            <Typography variant="subtitle1" color="text.secondary">Студентів по всьому світу</Typography>
                        </Grid>
                        {/* Факт 4 */}
                        <Grid item xs={6} md={3}>
                            <Typography variant="h3" sx={{ fontWeight: 900, color: ACCENT_COLOR }}>10+</Typography>
                            <Typography variant="subtitle1" color="text.secondary">Преміальних Напрямків</Typography>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 8 }}>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 800, mb: 3, color: '#333' }}
                        >
                            Не зволікай! Твоє майбутнє починається сьогодні.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ChevronRight />}
                            sx={{
                                borderRadius: '12px',
                                py: 1.5,
                                px: 5,
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                backgroundColor: ACCENT_COLOR,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                }
                            }}
                        >
                            Переглянути Усі Наші Курси
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default AboutPage;