import React, { useState } from 'react';
import { useTheme, useMediaQuery, AppBar, Container, Box, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // Додаємо іконку закриття

import { UserInfo } from "./UserInfo";
import { MainMenu } from "./MainMenu";
import { NavLink } from 'react-router'; // Потрібно для посилань у мобільному меню

export default function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // 1. СТАН: Стан для керування відкриттям/закриттям мобільного меню
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 2. ФУНКЦІЯ: Перемикання стану меню
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsMenuOpen(open);
    };

    // Компонент мобільного меню, що використовує існуючий MainMenu
    const MobileMenuDrawer = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)} // Закрити при кліку на елемент меню
            onKeyDown={toggleDrawer(false)} // Закрити при навігації клавіатурою
        >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                    Меню
                </Typography>
                <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            {/* Для мобільного меню ми не використовуємо MainMenu напряму, 
               бо він повертає лише <ul>, а нам потрібні компоненти ListItem.
               Тому продублюємо логіку Link, але для вертикального списку. 
            */}
            <MainMenu isMobile={true} />
            <Divider />

            {/* Тут можна додати елементи UserInfo (наприклад, кнопки Вхід/Реєстрація),
               або залишити їх у Header, як зараз.
            */}
        </Box>
    );

    // Стилі для Box (що імітує Toolbar) - Glassmorphism
    const headerBoxStyles = {
        display: "flex",
        gap: isMobile ? 1 : 3,
        justifyContent: "space-between",
        boxShadow: 'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px,hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        width: '100%',
        bgcolor: 'rgba(255 255 255 0.7)',
        borderRadius: '16px',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
        borderColor: 'hsla(220, 20%, 80%, 0.4)',
        padding: isMobile ? '6px 10px' : '8px 16px',
        backdropFilter: 'blur(24px)'
    };

    return (
        <>
            <AppBar
                component="header"
                position="fixed"
                enableColorOnDark
                sx={{ background: 'none', boxShadow: 'none' }}
            >
                <Container maxWidth="lg">
                    <Box sx={headerBoxStyles}>

                        {/* Логотип */}
                        <Box component="a" href="/" className="header__logo" sx={{ textDecoration: "none", color: "inherit", display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{ fontSize: isMobile ? '1.5rem' : '2rem', color: 'primary.light' }}
                            >
                                VT
                            </Typography>
                        </Box>

                        {/* Основне тіло (Меню + Користувач) */}
                        <Box className="header__body" sx={{ display: "flex", alignItems: "center", gap: isMobile ? 1 : 2 }}>

                            {/* 1. Основне Меню (ховаємо на мобільних) */}
                            {!isMobile && <MainMenu />}

                            {/* 2. Інформація про користувача */}
                            <UserInfo isMobile={isMobile} />

                            {/* 3. Кнопка мобільного меню (відображаємо лише на мобільних) */}
                            {isMobile && (
                                <IconButton
                                    color="primary"
                                    aria-label="open drawer"
                                    edge="end"
                                    onClick={toggleDrawer(true)} // КЛЮЧОВЕ ВИПРАВЛЕННЯ: Відкриває Drawer
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                        </Box>

                    </Box>
                </Container>
            </AppBar>

            {/* КОМПОНЕНТ MOBILE DRAWER */}
            <Drawer
                anchor="right" // Виїжджає справа
                open={isMenuOpen} // Керується станом
                onClose={toggleDrawer(false)} // Закривається при кліку поза областю
            >
                {MobileMenuDrawer}
            </Drawer>
        </>
    );
}