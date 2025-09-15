import { Box, Container, Typography } from "@mui/material";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                mt: "auto",
                bgcolor: "grey.500",
                textAlign: "center",
                maxWidth: 'lg',
                margin: '10px auto',
                width: '100%',
                borderRadius: '16px'
            }}
            className="footer"
        >
            <Container className="footer__container">
                <Typography variant="body2" color="text.white">
                    © 2025 Онлайн школа. Всі права захищені.
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;