import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth/api/authSlice'
import { Link, NavLink } from 'react-router'
import { getPagesObjectList } from '@/shared/config/routes/frontRoutes'
import { List, ListItem, Button } from "@mui/material";

export function MainMenu() {
    const user = useSelector(selectAuthUser)

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
                        <Button
                            component={NavLink}
                            to={path}
                            variant="text"
                            color="primary"
                            sx={{
                                "&.active": {
                                    borderBottom: "2px solid",
                                    borderColor: "primary.main",
                                    color: 'black'

                                },
                                backgroundColor: "transparent",
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                                '&:active': {
                                    backgroundColor: 'action.selected',
                                },
                                '&:focus-visible': {
                                    boxShadow: '0 0 0 3px rgba(33,150,243,0.35)'
                                }
                            }}
                        >
                            {meta.title}
                        </Button>
                    </ListItem>
                ))}
            </List>
        </nav>
    )
}
