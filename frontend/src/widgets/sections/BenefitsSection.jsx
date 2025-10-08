import React, { useState } from "react";
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Grid,
    Button,
} from "@mui/material";
import { Star, ThumbUp, LibraryBooks, Forum } from "@mui/icons-material";

function BenefitsSection() {
    const [activeTab, setActiveTab] = useState(0);

    const benefits = [
        {
            label: "Досвідчені викладачі",
            icon: <Star sx={{ mr: 1 }} />,
            title: "Тільки практикуючі викладачі",
            text: `Urna nisi, arcu cras nunc. Aenean quam est lobortis mi non fames dictum suspendisse. 
            Morbi mauris cras massa ut dolor quis sociis mollis augue. 
            Nunc, sodales tortor sit diam mi amet massa.`,
            image: "../../../public/image.svg",
        },
        {
            label: "Зворотний зв’язок і підтримка",
            icon: <ThumbUp sx={{ mr: 1 }} />,
            title: "Персональний фідбек і наставництво",
            text: `Отримуйте професійні поради та менторство від експертів, 
            які завжди готові допомогти вам удосконалити свої навички.`,
            image: "../../../public/image.svg",
        },
        {
            label: "Онлайн-бібліотека 24/7",
            icon: <LibraryBooks sx={{ mr: 1 }} />,
            title: "Навчайся коли зручно",
            text: `Доступ до нашої повної бібліотеки курсів, відео та матеріалів 24/7 — 
            вчіться у власному темпі.`,
            image: "../../../public/image.svg",
        },
        {
            label: "Спільнота",
            icon: <Forum sx={{ mr: 1 }} />,
            title: "Долучайся до студентської спільноти",
            text: `Станьте частиною активної спільноти учнів і викладачів. 
            Обмінюйтесь досвідом і розвивайтесь разом.`,
            image: "../../../public/image.svg",
        },
    ];


    const handleChange = (event, newValue) => setActiveTab(newValue);

    return (
        <Box component="section" sx={{ py: 10 }}>
            {/* Заголовки */}
            <Box textAlign="center" sx={{ mb: 4 }}>
                <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    OUR BENEFITS
                </Typography>
                <Typography
                    variant="h3"
                    fontWeight={700}
                    sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
                >
                    That’s how we do it
                </Typography>
            </Box>

            {/* Tabs */}
            <Tabs
                value={activeTab}
                onChange={handleChange}
                centered
                textColor="primary"
                TabIndicatorProps={{ style: { display: "none" } }}
                sx={{
                    mb: 6,
                    "& .MuiTab-root": {
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 600,
                        mx: 1,
                        color: "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        px: 2,
                        py: 1,
                    },
                    "& .Mui-selected": {
                        borderColor: "error.main",
                        color: "error.main",
                    },
                }}
            >
                {benefits.map((b, i) => (
                    <Tab key={i} label={b.label} icon={b.icon} iconPosition="start" />
                ))}
            </Tabs>

            {/* Контент активного табу */}
            <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="space-between"
            >
                <Grid item xs={12} md={6} width={'50%'}>
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                        {benefits[activeTab].title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        {benefits[activeTab].text}
                    </Typography>
                    <Button variant="contained" color="primary" size="large">
                        Learn more
                    </Button>
                </Grid>

                <Grid item xs={12} md={5} >
                    <Box
                        component="img"
                        src={benefits[activeTab].image}
                        alt={benefits[activeTab].label}
                        sx={{
                            width: "100%",
                            maxWidth: 480,
                            display: "block",
                            mx: "auto",
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}


export default BenefitsSection