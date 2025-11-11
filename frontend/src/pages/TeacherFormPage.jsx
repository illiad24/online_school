import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material'
import { useGetCoursesQuery } from '@/entities/cource/api/courseApi'
import { useTeacherForm } from '@/features/teacher/form/model/useTeacherFormSubmit'
import GenericForm from '@/features/FormBuilder/GenericForm'

function TeacherFormPage() {
    const { handleSubmit, register, errors, isLoading, isEditMode, teacher, generalError, selectedImage, setSelectedImage } = useTeacherForm()
    const { data: coursesList, isLoading: coursesLoading } = useGetCoursesQuery()

    if (isLoading) {
        return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
    }
    if (coursesLoading) {
        return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>

            {generalError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {generalError}
                </Alert>
            )}

            <Box sx={{ mt: 2 }}>
                <GenericForm
                    onSubmit={handleSubmit}
                    register={register}
                    errors={errors}
                    formTitle={isEditMode ? "Редагувати вчителя" : "Додати вчителя"}
                    submitLabel="Зберегти"
                    error={generalError}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    defaultValues={teacher || {}}
                    fields={[
                        { type: 'image', name: 'image' },
                        { name: 'name', label: 'Ім’я', validation: { required: 'Обов’язково' } },
                        { name: 'email', label: 'Email', type: 'email', validation: { required: 'Обов’язково' } },
                        { name: 'subject', label: 'Предмет', validation: { required: 'Обов’язково' } },
                        { name: 'bio', label: 'Біо', multiline: true, rows: 4 },
                        { name: 'experience', label: 'Досвід (років)', type: 'number', validation: { min: 0 } },
                        { name: 'age', label: 'Вік', type: 'number', validation: { min: 0 } },
                        {
                            type: 'select',
                            name: 'courses',
                            label: 'Курси',
                            multiple: true,
                            options: coursesList.map(c => ({ value: c._id, label: c.title })),
                        },
                    ]}
                />
            </Box>
        </Container>
    )
}

export default TeacherFormPage
