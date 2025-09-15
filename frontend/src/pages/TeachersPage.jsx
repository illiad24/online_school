import { Container, Box, Typography } from '@mui/material'
import TeacherList from '@/widgets/teacherList/TeacherList'

function TeachersPage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Teachers
            </Typography>

            <Box sx={{ mt: 2 }}>
                <TeacherList />
            </Box>
        </Container>
    )
}

export default TeachersPage
