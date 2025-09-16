import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material'
import { useGetCoursesQuery } from '@/entities/cource/api/courseApi'
import { useTeacherForm } from '@/features/teacher/form/model/useTeacherFormSubmit'
import TeacherForm from '@/features/teacher/form/ui/TeacherForm'

function TeacherFormPage() {
    const { handleSubmit, register, errors, isLoading, isEditMode, teacher, generalError } = useTeacherForm()
    const { data: coursesList, isLoading: coursesLoading } = useGetCoursesQuery()
    const mainTitle = isEditMode ? 'Редагувати вчителя' : 'Додати вчителя'

    if (isLoading) {
        return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
    }
    if (coursesLoading) {
        return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {mainTitle}
            </Typography>

            {generalError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {generalError}
                </Alert>
            )}

            <Box sx={{ mt: 2 }}>
                <TeacherForm
                    onSubmit={handleSubmit}
                    teacher={teacher}
                    coursesList={coursesList}
                    register={register}
                    errors={errors}
                    error={generalError}
                />
            </Box>
        </Container>
    )
}

export default TeacherFormPage
