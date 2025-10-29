import { useLogout } from "@/features/auth";
import SimpleButton from "@/shared/components/simpleButton/SimpleButton";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { useAuthRole } from "@/shared/hooks/useAuthRole";
import { Box, List, ListItemButton, Typography, Divider } from "@mui/material";

import { Link, Outlet, useNavigate } from "react-router";

function Profile() {
    const { user } = useAuthRole();
    const navigate = useNavigate()
    const { logoutUser } = useLogout()
    const onLogout = () => {
        logoutUser()
        navigate('/login')
    }

    return (
        <Box display="flex" minHeight="100vh" bgcolor="background.default">
            <Box
                width={240}
                bgcolor="background.paper"
                p={2}
                borderRight="1px solid"
                borderColor="divider"
            >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Профіль
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <List component="nav">
                    <ListItemButton
                        component={Link}
                        to={navigateRoutes.navigate.profile.main(user?.id)}
                    >
                        Налаштування
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={navigateRoutes.navigate.profile.courses}
                    >
                        Мої курси
                    </ListItemButton>
                </List>

                <Box sx={{ marginBottom: '32px' }}>
                    <SimpleButton text='Вийти з акаунту' type='button' bgColor='red' handleClick={onLogout} />
                </Box>
            </Box>

            <Box flex={1} p={3}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default Profile;
