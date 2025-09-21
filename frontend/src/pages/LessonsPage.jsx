import { useDeleteLessonMutation, useGetLessonsQuery } from "@/entities/lesson/api/lessonApi"
import LessonItem from "@/entities/lesson/ui/LessonItem"
import AddButton from "@/shared/components/addButton/AddButton"
import DeleteButton from "@/shared/components/deleteButton/DeleteButton"
import EditButton from "@/shared/components/editButton/EditButton"
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes"
import { Box, Typography, Stack, Divider, CircularProgress, Container } from "@mui/material"
import { useAuthRole } from "@/shared/hooks/useAuthRole"

function LessonsPage() {
    const { isAdmin, isSuperAdmin } = useAuthRole();



    const { data: lessonsList, isLoading, isError } = useGetLessonsQuery()
    const [deleteLesson] = useDeleteLessonMutation()

    const handleDelete = (id) => deleteLesson(id)

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (isError) {
        return (
            <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
                Помилка завантаження уроків
            </Typography>
        )
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Список уроків</Typography>
                {isAdmin && (
                    <AddButton
                        text="Додати урок"
                        handleClick={navigateRoutes.navigate.lessons.create}
                    />
                )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Stack spacing={2}>
                {lessonsList.map((lesson) => (
                    <LessonItem
                        key={lesson._id}
                        lesson={lesson}
                        actions={[
                            isSuperAdmin && (
                                <DeleteButton key={`delete-${lesson._id}`} handleSubmit={() => handleDelete(lesson._id)} />
                            ),
                            isAdmin && (
                                <EditButton key={`edit-${lesson._id}`} handleClick={navigateRoutes.navigate.lessons.edit(lesson._id)} />
                            )
                        ]}
                    />
                ))}
            </Stack>
        </Container>
    )
}

export default LessonsPage
