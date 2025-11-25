import React, { useState } from "react";
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Button,
    Paper,
    Container,
} from "@mui/material";
import {
    School,
    SupportAgent,
    MenuBook,
    Group,
} from "@mui/icons-material";

const benefitIcons = {
    teachers: <School sx={{ mr: 1 }} />,
    support: <SupportAgent sx={{ mr: 1 }} />,
    library: <MenuBook sx={{ mr: 1 }} />,
    community: <Group sx={{ mr: 1 }} />,
};

function BenefitsSection() {
    const [activeTab, setActiveTab] = useState(0);

    const benefits = [
        {
            key: "teachers",
            label: "Реальний Досвід",
            icon: benefitIcons.teachers,
            title: "Переймай знання у лідерів галузі, які знають, як досягти успіху",
            text: `Наші викладачі — це **не просто теоретики**, а успішні практики з багаторічним досвідом. Вони навчать вас не лише "що робити", а й **"як робити правильно"** з урахуванням усіх нюансів ринку. Це **прямий шлях** до вашого професійного росту.`,
            image: "/image.svg",
        },
        {
            key: "support",
            label: "Персональна Підтримка",
            icon: benefitIcons.support,
            title: "Твій особистий наставник 24/7. Жодних незрозумілих тем і ",
            text: `Забудьте про відчуття, що ви залишилися сам на сам зі складною темою. Наша команда підтримки на зв'язку **цілодобово**. Ви отримаєте **миттєві відповіді**, детальні пояснення та мотивацію, щоб ваш навчальний процес був **безперервним та результативним**.`,
            image: "/image.svg",
        },
        {
            key: "library",
            label: "Необмежений Доступ",
            icon: benefitIcons.library,
            title: "Вся база знань VT у твоєму розпорядженні – назавжди",
            text: `Уся навчальна програма, відео, конспекти, шаблони та тести — доступні **24/7** і залишаються з вами **навіть після завершення курсу**. Це ваша персональна скарбниця знань, до якої можна повернутися, щоб **освіжити знання** або **знайти ідеальний матеріал** для роботи.`,
            image: "/image.svg",
        },
        {
            key: "community",
            label: "Сила Спільноти",
            icon: benefitIcons.community,
            title: "Нетворкінг, який відкриває нові двері: Спілкуйся та знаходь можливості",
            text: `VT — це не лише навчання, а й потужний **нетворкінг**. Обмінюйтесь досвідом, знаходьте партнерів для проектів, отримуйте **інсайти** від однодумців та випускників. Ваше оточення впливає на ваш успіх. **Надихайтесь на великі досягнення!**`,
            image: "/image.svg",
        },
    ];

    const handleChange = (_, newValue) => setActiveTab(newValue);

    return (
        <Container maxWidth='lg'
            component="section"
            sx={{ py: { xs: 8, md: 12 }, }}
        >
            {/* Заголовки */}
            <Box textAlign="center" sx={{ mb: 6, px: 2 }}>
                <Typography variant="subtitle1" color="primary" fontWeight={700} letterSpacing={2} textTransform="uppercase">
                    МАКСИМАЛЬНІ МОЖЛИВОСТІ
                </Typography>
                <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{
                        fontSize: { xs: "2.2rem", sm: "2.5rem", md: "3rem" },
                        mt: 1,
                        color: "text.primary"
                    }}
                >
                    Чому **10 000+ учнів** обирають навчання у VT
                </Typography>
            </Box>

            {/* Tabs */}
            <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2 }}>
                <Tabs
                    value={activeTab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    centered
                    sx={{
                        mb: 6,
                        "& .MuiTabs-flexContainer": {
                            justifyContent: "center",
                        },
                        "& .MuiTab-root": {
                            borderRadius: "12px",
                            textTransform: "uppercase",
                            fontWeight: 700,
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            minHeight: "56px",
                            mx: 1,
                            my: 1,
                            border: '1px solid transparent',
                            boxShadow: 1,
                            color: "text.secondary",
                            transition: "all 0.3s ease-in-out",

                            '&:hover': {
                                boxShadow: 3,
                                transform: 'translateY(-2px)'
                            },
                        },
                        "& .Mui-selected": {
                            color: "primary.main",
                            borderColor: "primary.main",
                            boxShadow: 6,
                            background: "white",
                        }
                    }}
                >
                    {benefits.map((b, i) => (
                        <Tab
                            key={i}
                            label={b.label}
                            icon={b.icon}
                            iconPosition="start"
                        />
                    ))}
                </Tabs>
            </Box>

            {/* Контент активного табу - ТЕПЕР ВИКОРИСТОВУЄ FLEXBOX */}
            <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2 }}>
                <Paper elevation={12} sx={{ p: { xs: 4, md: 6 }, borderRadius: '16px' }}>
                    <Box
                        // FLEX CONTAINER
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' }, // Стовпчик на мобільних, рядок на десктопі
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 4, // Проміжок між елементами
                        }}
                    >
                        {/* Текст (Flex Item 1) */}
                        <Box
                            sx={{
                                // Щоб займав приблизно 60% місця на десктопі
                                flex: { xs: 'none', md: '0 0 55%' },
                                order: { xs: 2, md: 1 }, // Порядок на мобільних: 2 (під зображенням)
                            }}
                        >
                            <Typography
                                variant="h4"
                                fontWeight={800}
                                color="primary.main"
                                sx={{ mb: 1, fontSize: { xs: "1.5rem", md: "2rem" } }}
                            >
                                {benefits[activeTab].title}
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 4, lineHeight: 1.8, fontSize: { xs: "1rem", md: "1.1rem" } }}
                            >
                                {benefits[activeTab].text}
                            </Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                    py: 1.5,
                                    px: 4,
                                    fontWeight: 700,
                                    borderRadius: '8px'
                                }}
                            >
                                Розпочати успішне навчання
                            </Button>
                        </Box>

                        {/* Зображення (Flex Item 2) */}
                        <Box
                            sx={{
                                // Щоб займав приблизно 40% місця на десктопі
                                flex: { xs: 'none', md: '0 0 40%' },
                                order: { xs: 1, md: 2 }, // Порядок на мобільних: 1 (над текстом)
                                width: { xs: '100%', md: 'auto' }
                            }}
                        >
                            <Box
                                component="img"
                                src={benefits[activeTab].image}
                                alt={benefits[activeTab].label}
                                sx={{
                                    width: "100%",
                                    maxWidth: 550,
                                    height: 'auto',
                                    display: "block",
                                    mx: "auto",
                                }}
                            />
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default BenefitsSection;