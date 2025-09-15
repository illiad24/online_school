import { Container, Typography, Box } from '@mui/material'
import { UserList } from '@/widgets/userList/UserList'

function UsersPage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }} gutterBottom>
                Users Page
            </Typography>

            <Box sx={{ mt: 2 }}>
                <UserList />
            </Box>
        </Container>
    )
}

export default UsersPage
