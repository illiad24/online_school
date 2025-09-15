import { Container, Typography } from '@mui/material'
import CourseList from '@/widgets/course/CourseList'

function CoursesPage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4,  }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Courses
            </Typography>
            <CourseList />
        </Container>
    )
}

export default CoursesPage
