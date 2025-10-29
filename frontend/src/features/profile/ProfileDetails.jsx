import React from "react";
import { Container, Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Grid, Box } from "@mui/material";

import ProfileImage from "./components/ProfileEdit";
import PasswordEdit from "./components/PasswordEdit";
import ProfileDelete from "./components/ProfileDelete";
import { useAuthRole } from "@/shared/hooks/useAuthRole";

function ProfileDetails() {
    const { user } = useAuthRole();
    return (
        <Container sx={{ py: 3 }}>
            <Typography variant="h5" gutterBottom>
                Налаштування профілю
            </Typography>
            <Grid container spacing={2}>
            </Grid>
            <Box sx={{ marginBottom: '32px' }} >
                <ProfileImage />
            </Box>
            <Box sx={{ marginBottom: '32px' }}>
                <PasswordEdit />
            </Box>
        
            <Box >
                <ProfileDelete userEmail={user?.email} />
            </Box>
        </Container>
    );
}

export default ProfileDetails;