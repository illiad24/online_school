import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography, Stack, CircularProgress, Card, CardContent } from '@mui/material'

import { useDeleteCourseMutation, useGetCoursesQuery } from '@/entities/cource/api/courseApi'
import CourseItem from '@/entities/cource/ui/CourseItem'
import { selectAuthUser } from '@/features/auth'
import AddButton from '@/shared/components/addButton/AddButton'
import DeleteButton from '@/shared/components/deleteButton/DeleteButton'
import EditButton from '@/shared/components/editButton/EditButton'
import { navigateRoutes } from '@/shared/config/routes/navigateRoutes'

function CourseList() {
    const user = useSelector(selectAuthUser)
    const userRole = user?.role?.title

    const isSuperAdmin = userRole === 'admin'
    const isAdmin = userRole === 'admin' || userRole === 'manager'

    const { data: courses, isLoading } = useGetCoursesQuery()
    const [deleteCourse] = useDeleteCourseMutation()

    const [openLessonFormFor, setOpenLessonFormFor] = useState(null)

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Список курсів</Typography>
                {isAdmin && (
                    <AddButton
                        text="Додати курс"
                        handleClick={navigateRoutes.navigate.courses.create}
                    />
                )}
            </Stack>

            {(!courses || courses.length === 0) ? (
                <Typography variant="body1" color="text.secondary">
                    Курси ще не додано.
                </Typography>
            ) : (
                <Stack spacing={3}>
                    {courses.map((course) => (
                        <Card key={course._id} sx={{ p: 2 }}>
                            <CourseItem
                                course={course}
                                isAddingLesson={openLessonFormFor === course._id}
                                actions={[
                                    isAdmin && (
                                        <AddButton
                                            key={`add-lesson-${course._id}`}
                                            text={openLessonFormFor === course._id ? 'Закрити форму' : 'Додати урок'}
                                            type="button"
                                            handleClick={() =>
                                                setOpenLessonFormFor((prev) =>
                                                    prev === course._id ? null : course._id
                                                )
                                            }
                                        />
                                    ),
                                    isSuperAdmin && (
                                        <DeleteButton
                                            key={`delete-${course._id}`}
                                            handleSubmit={() => deleteCourse(course._id)}
                                        />
                                    ),
                                    isAdmin && (
                                        <EditButton
                                            key={`edit-${course._id}`}
                                            handleClick={navigateRoutes.navigate.courses.edit(course._id)}
                                        />
                                    ),
                                ]}
                            />
                        </Card>
                    ))}
                </Stack>
            )}
        </Box>
    )
}

export default CourseList
