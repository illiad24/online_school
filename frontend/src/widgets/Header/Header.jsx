
import { Link } from "react-router";
import { UserInfo } from "./UserInfo";
import { MainMenu } from "./MainMenu";
import { AppBar, Container, Toolbar, Box, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar
            component="header"
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                borderRadius: '16px',
                // background: 'rgba(255, 255, 255, 0.4)',
                background: 'hsl(210, 100%, 80%)',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
                maxWidth: 'lg',
                margin: '10px auto',
                top: '0',
                left: '0'
            }}
        >

            <Container maxWidth="lg" sx={{ borderRadius: '16px' }}>
                <Toolbar disableGutters sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}>

                    <Box component="a" href="/" className="header__logo" sx={{ textDecoration: "none", color: "inherit" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '2.5rem' }} >
                            VT
                        </Typography>
                    </Box>

                    <Box className="header__body" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <MainMenu />
                        <UserInfo />
                    </Box>

                </Toolbar>
            </Container>

        </AppBar>
    );
}
