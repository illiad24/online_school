import React from "react";
import { useLogout } from "@/features/auth";
import SimpleButton from "@/shared/components/simpleButton/SimpleButton";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { useAuthRole } from "@/shared/hooks/useAuthRole";
import {
    Box,
    List,
    ListItemButton,
    Typography,
    Divider,
    useTheme,
    useMediaQuery,
    Stack,
    Button as MuiButton,
    Container
} from "@mui/material";
import { Link, Outlet, useNavigate, useLocation } from "react-router";
import { AccountCircle, School, Logout, Settings, Dashboard } from "@mui/icons-material";

// Вміст меню
const menuItems = [
    { title: 'Налаштування', routeKey: 'main', icon: Settings },
    { title: 'Мої курси', routeKey: 'courses', icon: School },
];

function Profile() {
    const { user, userRole } = useAuthRole();
    const navigate = useNavigate();
    const { logoutUser } = useLogout();
    const location = useLocation();
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const activeRoute = menuItems.find(item => {
        const route = navigateRoutes.navigate.profile[item.routeKey];

        const url = typeof route === "function"
            ? route(user?.id)
            : route;

        if (item.routeKey === "main") {
            return location.pathname === url;
        } else {
            return location.pathname.endsWith(url);
        }
    })?.routeKey || "main";


    console.log(activeRoute);



    // profile: {
    //     main: (id) => `/profile/${id}`,
    //     courses: 'courses'
    // }

    const onLogout = () => {
        logoutUser();
        navigate('/login');
    };

    // Обчислення посилань
    const getRoute = (key) => {
        if (key === 'main') {
            return navigateRoutes.navigate.profile.main(user?.id);
        }
        return navigateRoutes.navigate.profile[key];
    }


    // ------------------------------------------------------------------
    // 1. САЙДБАР (для Десктопу)
    // ------------------------------------------------------------------
    const Sidebar = () => (
        <Box
            width={280} // Трохи ширший для кращого вигляду
            flexShrink={0}
            bgcolor={theme.palette.background.paper}
            p={3}
            borderRight={`1px solid ${theme.palette.divider}`}
            sx={{
                display: { xs: 'none', md: 'block' }, // Тільки для десктопу
                boxShadow: '0 0 10px rgba(0,0,0,0.02)', // Легка тінь
            }}
        >
            {/* Інформаційний Блок Користувача */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3,
                pb: 2,
                borderBottom: `1px solid ${theme.palette.divider}`
            }}>
                <AccountCircle sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 1.5 }} />
                <Box>
                    <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                        {user?.name || `Користувач (${userRole})`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {user?.email || `Роль: ${userRole}`}
                    </Typography>
                </Box>
            </Box>

            {/* Меню Навігації */}
            <List component="nav" disablePadding>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.routeKey}
                        component={Link}
                        to={getRoute(item.routeKey)}
                        selected={activeRoute === item.routeKey}
                        sx={{
                            borderRadius: theme.shape.borderRadius,
                            mb: 0.5,
                            py: 1.2,
                            px: 2,
                            // Стилізація активного елемента
                            '&.Mui-selected': {
                                backgroundColor: theme.palette.primary.light, // Світлий фон
                                color: theme.palette.primary.contrastText, // Текст
                                '& .MuiSvgIcon-root': { color: theme.palette.primary.dark }, // Іконка
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main,
                                }
                            },
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            }
                        }}
                    >
                        <item.icon sx={{ mr: 2, color: activeRoute === item.routeKey ? theme.palette.primary.dark : theme.palette.text.secondary }} />
                        <Typography fontWeight={activeRoute === item.routeKey ? 600 : 400}>
                            {item.title}
                        </Typography>
                    </ListItemButton>
                ))}
            </List>

            <Divider sx={{ my: 3 }} />

            {/* Кнопка Виходу */}
            <MuiButton
                onClick={onLogout}
                variant="outlined"
                color="error"
                startIcon={<Logout />}
                fullWidth
                sx={{
                    borderRadius: theme.shape.borderRadius,
                    py: 1.2,
                    fontWeight: 600,
                    // Використовуємо MUI Button для кращої інтеграції стилів
                }}
            >
                Вийти з акаунту
            </MuiButton>

        </Box>
    );

    // ------------------------------------------------------------------
    // 2. ВЕРХНЄ МЕНЮ (для Мобільних)
    // ------------------------------------------------------------------
    const MobileNav = () => (
        <Box
            bgcolor={theme.palette.background.paper}
            borderBottom={`1px solid ${theme.palette.divider}`}
            px={2}
            py={1.5}
            sx={{ display: { xs: 'block', md: 'none' } }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography variant="h6" fontWeight={700} color="text.primary">
                    <Dashboard sx={{ mr: 1, verticalAlign: 'middle' }} /> Кабінет
                </Typography>
                <MuiButton
                    onClick={onLogout}
                    color="error"
                    size="small"
                    startIcon={<Logout />}
                    sx={{ textTransform: 'none' }}
                >
                    Вийти
                </MuiButton>
            </Stack>

            {/* Меню в горизонтальному вигляді */}
            <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1.5 }}>
                {menuItems.map((item) => (
                    <MuiButton
                        key={item.routeKey}
                        component={Link}
                        to={getRoute(item.routeKey)}
                        variant={activeRoute === item.routeKey ? "contained" : "outlined"}
                        size="small"
                        color={activeRoute === item.routeKey ? "primary" : "secondary"}
                        startIcon={<item.icon />}
                        sx={{
                            flexShrink: 0,
                            borderRadius: '20px',
                            textTransform: 'none',
                            fontWeight: 600
                        }}
                    >
                        {item.title}
                    </MuiButton>
                ))}
            </Stack>
        </Box>
    );

    // ------------------------------------------------------------------
    // 3. ОСНОВНИЙ РЕНДЕРИНГ
    // ------------------------------------------------------------------

    return (
        <Container maxWidth="lg" >
            <Box display="flex" minHeight="100vh" bgcolor={theme.palette.grey[50]} flexDirection={isMobile ? 'column' : 'row'}>


                {/* Навігація */}
                <Sidebar />
                <MobileNav />

                {/* Основний Контент */}
                <Box
                    flex={1}
                    p={isMobile ? 2 : 4}
                    sx={{ overflowY: 'auto', width: isMobile ? '100%' : 'auto' }}
                >
                    {/* Хлібні крихти або заголовок поточної секції тут */}
                    <Box mb={4}>
                        <Typography variant="h4" fontWeight={800} color="text.primary">
                            {menuItems.find(item => item.routeKey === activeRoute)?.title || 'Загальна Інформація'}
                        </Typography>
                    </Box>

                    <Outlet />
                </Box>
            </Box>
        </Container>
    );
}

export default Profile;