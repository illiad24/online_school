import React from 'react'
import { Card, CardContent, Typography, Box, Stack, Divider } from '@mui/material'
import LessonForm from '@/widgets/lesson/SelectLesson'
import { Link } from 'react-router'
import { navigateRoutes } from '@/shared/config/routes/navigateRoutes'

function CourseItem({ course, actions, isAddingLesson }) {
    return (
        <Card sx={{ p: 2, mb: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component={Link} to={navigateRoutes.navigate.courses.getCourseById(course._id)} gutterBottom>
                    {course?.title}
                </Typography>

                <Typography variant="body1" color="text.secondary" gutterBottom>
                    {course?.description}
                </Typography>

                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                    Price: {course?.price}
                </Typography>
                {isAddingLesson && (
                    <Box sx={{ mt: 2 }}>
                        <LessonForm courseId={course._id} />
                    </Box>
                )}

                {actions?.length > 0 && (
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Stack direction="row" spacing={1}>
                            {actions.map((action, index) => (
                                <React.Fragment key={index}>{action}</React.Fragment>
                            ))}
                        </Stack>
                    </Box>
                )}
            </CardContent>
        </Card>
    )
}

export default CourseItem
