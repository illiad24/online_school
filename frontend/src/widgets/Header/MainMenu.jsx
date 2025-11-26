import { Link, NavLink } from 'react-router'; // Використовуємо react-router-dom
import { getPagesObjectList } from '@/shared/config/routes/frontRoutes'
import { List, ListItem, useTheme, ListItemText } from "@mui/material"; // Додаємо ListItemText
import { useAuthRole } from '@/shared/hooks/useAuthRole';

// Приймаємо новий проп isMobile
export function MainMenu({ isMobile = false }) {
    const theme = useTheme();
    const { user } = useAuthRole();

    const allowedRoutes = getPagesObjectList().filter(({ meta }) => {
        if (!meta.isInMenu) return false
        if (!meta.requireAuth) return true
        if (!user) return false
        if (!meta.roles) return true
        return meta?.roles.includes(user?.role.title)
    })

    return (
        <nav aria-label="Main navigation" className="menu">
            <List
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row", // Вертикальний стек для мобільних
                    gap: isMobile ? 0 : 2,
                    p: 0
                }}
            >
                {allowedRoutes.map(({ path, meta }) => (
                    <ListItem key={path} disablePadding sx={{ width: isMobile ? "100%" : "auto" }}>
                        <NavLink
                            to={path}
                            className={({ isActive }) => (isActive ? "active menu-link" : "menu-link")}
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                padding: isMobile ? '8px 16px' : '0 4px', // Збільшуємо padding на мобільних
                                display: 'block',
                                width: '100%',
                                fontWeight: isActive ? 700 : 500,
                                color: isActive
                                    ? theme.palette.primary.light
                                    : theme.palette.text.primary,
                                // Якщо це мобільний, нехай колір буде темнішим
                                '&:hover': {
                                    backgroundColor: isMobile ? theme.palette.action.hover : 'transparent'
                                }
                            })}
                        >
                            {/* Використовуємо ListItemText лише якщо потрібно більше контролю, але NavLink сам по собі працює як посилання */}
                            {meta.title}
                        </NavLink>
                    </ListItem>
                ))}
            </List>
        </nav>
    )
}