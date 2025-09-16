import { Container, Typography } from '@mui/material'
import CourseList from '@/widgets/course/CourseList'

function CoursesPage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
            <CourseList />
        </Container>
    )
}

export default CoursesPage
