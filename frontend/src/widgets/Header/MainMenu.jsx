import { Link, NavLink } from 'react-router'
import { getPagesObjectList } from '@/shared/config/routes/frontRoutes'
import { List, ListItem, Button, useTheme } from "@mui/material";
import { useAuthRole } from '@/shared/hooks/useAuthRole';

export function MainMenu() {
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
            <List sx={{ display: "flex", flexDirection: "row", gap: 2, p: 0 }}>
                {allowedRoutes.map(({ path, meta }) => (
                    <ListItem key={path} disablePadding sx={{ width: "auto" }}>
                        <NavLink
                            to={path}
                            className={({ isActive }) => (isActive ? "active menu-link" : "menu-link")}
                            style={({ isActive }) => ({
                                color: isActive
                                    ? theme.palette.primary.light
                                    : theme.palette.primary.dark,
                            })}
                        >
                            {meta.title}
                        </NavLink>
                    </ListItem>
                ))}
            </List>
        </nav>
    )
}


