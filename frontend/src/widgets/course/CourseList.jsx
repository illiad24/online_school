import { useState } from 'react'
import { Box, Typography, Stack, CircularProgress, Card, CardContent, Snackbar, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { useDeleteCourseMutation, useGetCoursesQuery } from '@/entities/cource/api/courseApi'
import CourseItem from '@/entities/cource/ui/CourseItem'
import AddButton from '@/shared/components/addButton/AddButton'
import DeleteButton from '@/shared/components/deleteButton/DeleteButton'
import EditButton from '@/shared/components/editButton/EditButton'
import { navigateRoutes } from '@/shared/config/routes/navigateRoutes'
import EnrollButton from '@/shared/components/enrollButton/EnrollButton'
import { useEnrollButton } from '@/shared/components/enrollButton/useEnrollButton'
import { useAuthRole } from '@/shared/hooks/useAuthRole'
import { selectAccessToken, setCredentials } from '@/features/auth/api/authSlice'
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import GridViewIcon from '@mui/icons-material/GridView';

function CourseList() {
    const { user, isAdmin, isSuperAdmin, isStudent } = useAuthRole();

    const dispatch = useDispatch()

    const accessToken = useSelector(selectAccessToken)

    const { data: courses, isLoading, refetch } = useGetCoursesQuery()


    const { enrollClick } = useEnrollButton()
    const [deleteCourse] = useDeleteCourseMutation()

    const [openLessonFormFor, setOpenLessonFormFor] = useState(null)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

    const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }))
    const [layoutClass, setLayoutClass] = useState('grid-view')
    function changeLayoutView(type) {
        switch (type) {
            case 1:
                setLayoutClass('grid-view')
                break;
            case 2:
                setLayoutClass('inline-view')
                break;

            default:
                setLayoutClass('grid-view')
                break;
        }
    }

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
                <Box sx={{ display: 'flex', gap: '16px' }}>
                    <Box  >
                        <GridViewIcon onClick={() => changeLayoutView(1)} />
                    </Box>
                    <Box  >
                        <SplitscreenIcon onClick={() => changeLayoutView(2)} />

                    </Box>
                </Box>
            </Stack>

            {(!courses || courses.length === 0) ? (
                <Typography variant="body1" color="text.secondary">
                    Курси ще не додано.
                </Typography>
            ) : (
                <Box spacing={3} className={layoutClass}>
                    {courses.map((course) => (
                        <CourseItem
                         key={course._id}
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
                                isStudent && !user?.courses?.some(c => c._id === course._id) && (
                                    <EnrollButton
                                        key={`enroll-${course._id}`}
                                        handleClick={async () => {
                                            const result = await enrollClick(course._id, user.id, user)
                                            setSnackbar({ open: true, message: result.message, severity: result.success ? 'success' : 'warning' })
                                            if (result.success) {
                                                const nextUser = { ...user, courses: [...(user?.courses || []), course] }
                                                dispatch(setCredentials({ user: nextUser, accessToken }))
                                                refetch()
                                            }
                                        }}
                                    />
                                )
                            ]}
                        />

                    ))}
                </Box>
            )}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default CourseList
