import { Container, Typography, CircularProgress, Box } from '@mui/material'
import { useGetTeachersQuery } from '@/entities/teacher/api/teacherApi'
import { useCourseForm } from '@/features/course/form/model/useCourseFormSubmit'
import CourseForm from '@/features/course/form/ui/CourseForm'
import GenericForm from '@/features/FormBuilder/GenericForm'

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
            <GenericForm
                onSubmit={handleSubmit}
                register={register}
                errors={errors}
                formTitle={mainTitle}
                submitLabel="Зберегти"
                error={generalError}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                defaultValues={course || {}}
                fields={[
                    { type: 'image', name: 'image' },
                    { name: 'title', label: 'Назва', validation: { required: 'Обов’язково', minLength: 3 } },
                    { name: 'description', label: 'Опис', multiline: true, rows: 4, validation: { required: 'Обов’язково' } },
                    { name: 'price', label: 'Ціна', type: 'number', validation: { required: 'Обов’язково', min: 0 } },
                    { type: 'select', name: 'teacher', label: 'Вчитель', options: teachersList.map(t => ({ value: t._id, label: t.name })), validation: { required: 'Обов’язково' } }
                ]}
                entiti={course}
            />
        </Container>
    )
}

export default CourseFormPage
