import { Container, Typography, CircularProgress, Box } from '@mui/material'
import { useGetTeachersQuery } from '@/entities/teacher/api/teacherApi'
import { useCourseForm } from '@/features/course/form/model/useCourseFormSubmit'
import CourseForm from '@/features/course/form/ui/CourseForm'

function CourseFormPage() {
    const { handleSubmit, register, errors, isLoading, isEditMode, course, generalError, selectedImage, setSelectedImage } = useCourseForm()

    const { data: teachersList, isLoading: isTeachersLoading } = useGetTeachersQuery()

    const mainTitle = isEditMode ? 'Редагувати курс' : 'Додати курс'

    if (isLoading || isTeachersLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                {mainTitle}
            </Typography>

            <CourseForm
                onSubmit={handleSubmit}
                course={course}
                teachersList={teachersList}
                register={register}
                errors={errors}
                error={generalError}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
            />
        </Container>
    )
}

export default CourseFormPage
