
import { UserInfo } from "./UserInfo";
import { MainMenu } from "./MainMenu";
import { AppBar, Container, Toolbar, Box, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar
            component="header"
            position="fixed"
            enableColorOnDark

        >

            <Container maxWidth="lg"

            >
                <Box disableGutters sx={{
                    display: "flex", gap: 3, justifyContent: "space-between", boxShadow: 'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px,hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
                    width: '100%',
                    bgcolor: 'rgba(255 255 255 0.4)',
                    borderRadius: '16px',
                    mt: 'calc(var(--template-frame-height, 0px) + 28px)',
                    maxWidth: 'lg',
                    top: '0',
                    left: '0',
                    borderColor: 'hsla(220, 20%, 80%, 0.4)',
                    padding: '8px 16px',
                    backdropFilter: 'blur(24px)'
                }}>

                    <Box component="a" href="/" className="header__logo" sx={{ textDecoration: "none", color: "inherit" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '2rem', color: 'primary.light' }} >
                            VT
                        </Typography>
                    </Box>

                    <Box className="header__body" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <MainMenu />
                        <UserInfo />
                    </Box>

                </Box>
            </Container>

        </AppBar>
    );
}
