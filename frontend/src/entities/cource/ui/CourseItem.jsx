import React from 'react'
import { Card, CardContent, Typography, Box, Stack, Divider } from '@mui/material'
import LessonForm from '@/widgets/lesson/SelectLesson'

function CourseItem({ course, actions, isAddingLesson }) {
    return (
        <Card sx={{ p: 2, mb: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    {course?.title}
                </Typography>

                <Typography variant="body1" color="text.secondary" gutterBottom>
                    {course?.description}
                </Typography>

                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                    Price: {course?.price}
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Уроки:
                    </Typography>
                    <Divider sx={{ mb: 1 }} />
                    {course?.lessons?.length > 0 ? (
                        <Stack spacing={1}>
                            {course.lessons.map((lesson) => (
                                <Typography key={lesson._id} variant="body2">
                                    {lesson.title}
                                </Typography>
                            ))}
                        </Stack>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Уроки не додано.
                        </Typography>
                    )}
                </Box>

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
