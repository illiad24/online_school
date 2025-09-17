import { selectAuthUser } from "@/features/auth";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { Box, List, ListItemButton, Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router";

function Profile() {
    const user = useSelector(selectAuthUser);

    return (
        <Box display="flex" minHeight="100vh" bgcolor="background.default">
            {/* Ліва панель */}
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
            </Box>

            {/* Контент */}
            <Box flex={1} p={3}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default Profile;
