import { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    Stack,
    CircularProgress,
    Snackbar,
    Alert,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material'
import { useDeleteCourseMutation, useGetCoursesQuery } from '@/entities/cource/api/courseApi'
import CourseItem from '@/entities/cource/ui/CourseItem'
import AddButton from '@/shared/components/addButton/AddButton'
import DeleteButton from '@/shared/components/deleteButton/DeleteButton'
import EditButton from '@/shared/components/editButton/EditButton'
import EnrollButton from '@/shared/components/enrollButton/EnrollButton'
import { useEnrollButton } from '@/shared/components/enrollButton/useEnrollButton'
import { useAuthRole } from '@/shared/hooks/useAuthRole'
import { navigateRoutes } from '@/shared/config/routes/navigateRoutes'
import GridViewIcon from '@mui/icons-material/GridView'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import SimpleButton from '@/shared/components/simpleButton/SimpleButton'
import { useGetUserEnrollmentsQuery } from '@/entities/enrollment/enrollmentApi'

function CourseList() {
    const { user, isAdmin, isSuperAdmin, isStudent } = useAuthRole()
    const { data: courses, isLoading, refetch } = useGetCoursesQuery()
    const userId = user?._id || user?.id

    console.log(userId);

    const { data: enrollments } = useGetUserEnrollmentsQuery(
        userId
    )



    function isUserInCourse(courseId) {
        return enrollments?.some(en => en.course === courseId) ?? false;
    }

    const { enrollClick } = useEnrollButton()

    const [deleteCourse] = useDeleteCourseMutation()

    const [openLessonFormFor, setOpenLessonFormFor] = useState(null)

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

    const [layout, setLayout] = useState(() => localStorage.getItem('layoutView') || 'grid-view')

    const handleChangeLayout = (_, newLayout) => {
        if (newLayout) {
            setLayout(newLayout)
            localStorage.setItem('layoutView', newLayout)
        }
    }

    async function enrollAction(courseId) {

        const result = await enrollClick(userId, courseId)
        setSnackbar({ open: true, message: result.message, severity: result.success ? 'success' : 'warning' })
        if (result.success) {
            refetch()
        }

    }

    const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }))

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        )
    }




    return (
        <Box sx={{ mt: 4 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'start', sm: 'center' }} mb={3} spacing={2}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>🎓 Наші курси</Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                    {isAdmin && (
                        <AddButton
                            text="Додати курс"
                            handleClick={navigateRoutes.navigate.courses.create}
                        />
                    )}
                    <ToggleButtonGroup
                        value={layout}
                        exclusive
                        onChange={handleChangeLayout}
                        size="small"
                        color="primary"
                        sx={{
                            backgroundColor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 2,
                            '& .MuiToggleButton-root': { border: 'none' },
                        }}
                    >
                        <ToggleButton value="grid-view"><GridViewIcon /></ToggleButton>
                        <ToggleButton value="inline-view"><SplitscreenIcon /></ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </Stack>

            {(!courses || courses.length === 0) ? (
                <Typography variant="body1" color="text.secondary">
                    Курси ще не додано.
                </Typography>
            ) : (
                <Box className={layout} sx={{
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: layout === 'grid-view' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr',
                    transition: 'all 0.3s ease',
                }}>
                    {courses.map((course) => (
                        <CourseItem
                            key={course._id}
                            course={course}
                            layout={layout}
                            isAddingLesson={openLessonFormFor === course._id}
                            actions={[
                                isAdmin && (
                                    <SimpleButton
                                        key={`lesson-manager-${course._id}`} text='Керувати уроками' handleClick={navigateRoutes.navigate.courses.courseLessonManager(course?._id)}
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
                                (isAdmin || isSuperAdmin || isStudent) && !isUserInCourse(course._id) && (
                                    <EnrollButton
                                        key={`enroll-${course._id}`}
                                        handleClick={() => enrollAction(course._id)}
                                    />
                                ),
                                (isAdmin || isSuperAdmin || isStudent) && isUserInCourse(course._id) && (
                                    <SimpleButton
                                        key={`continue-${course._id}`} text='продовжити навчання' handleClick={navigateRoutes.navigate.courses.courseLearn(course?._id)}
                                    />
                                ),
                                <SimpleButton
                                    key={`detail-${course._id}`} text='Деталі' handleClick={navigateRoutes.navigate.courses.getCourseById(course?._id)}
                                />

                            ].filter(Boolean)}
                        />
                    ))}
                </Box>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default CourseList
