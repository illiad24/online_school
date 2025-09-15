import { Outlet } from "react-router"
import { Box, Container } from "@mui/material"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

export function MainLayout() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flex: 1, py: 4, paddingTop: '100px' }}>
                <Container maxWidth="lg" >
                    <Outlet />
                </Container>
            </Box>
            <Footer />
        </Box>
    )
}
