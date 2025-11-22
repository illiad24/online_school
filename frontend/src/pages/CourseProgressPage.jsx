import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import {
    Box, Typography, Button, LinearProgress, List, ListItemButton,
    Paper
} from '@mui/material'

import { useAuthRole } from '@/shared/hooks/useAuthRole'
import { useCompleteLessonMutation, useGetEnrollmentByCourseQuery } from '@/entities/enrollment/enrollmentApi'

export default function CourseProgressPage() {
    const { courseId } = useParams()
    const { user } = useAuthRole()

    const userId = user?._id || user?.id

    const { data: enrollment, isLoading: enrollmentLoading } = useGetEnrollmentByCourseQuery({ userId, courseId })


    const loading = enrollmentLoading
    const course = enrollment?.course



    const [completeLesson] = useCompleteLessonMutation()


    const [activeLessonIndex, setActiveLessonIndex] = useState(0)
    const [localCompletedLessons, setLocalCompletedLessons] = useState([])

    const completedLessons = enrollment?.completedLessons;

    useEffect(() => {
        if (enrollment && course && course.lessons) {

            setLocalCompletedLessons(completedLessons)
            // Перевіряємо чи урок завершено (lessons тепер об'єкти з _id)
            const nextIndex = course.lessons.findIndex(lesson => {
                const lessonId = typeof lesson === 'object' ? lesson._id?.toString() : lesson?.toString()
                return !completedLessons.includes(lessonId)
            })

            if (nextIndex !== -1) setActiveLessonIndex(nextIndex)
        }
    }, [course, enrollment, completedLessons])

    if (loading) return <p>Loading...</p>

    const lessons = course?.lessons || []
    const activeLesson = lessons[activeLessonIndex] // Тепер це об'єкт уроку, а не ID


    const progress = enrollment?.progress
    const isCompleted = enrollment?.status == 'completed'

    async function handleCompleteLesson() {
        if (!enrollment || !activeLesson) return

        const lessonId = activeLesson._id?.toString() || activeLesson.toString()

        if (!localCompletedLessons.includes(lessonId)) {

            setLocalCompletedLessons(prev => [...prev, lessonId])

            await completeLesson({ userId, courseId, lessonId })
        }
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f8f9fb' }}>

            <Box sx={{
                width: 300,
                borderRight: '1px solid #ddd',
                bgcolor: '#0f1115',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                p: 2
            }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {course?.title}
                </Typography>

                <Typography sx={{ fontSize: 14, mb: 1 }}>Прогрес курсу</Typography>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ mb: 3, bgcolor: '#2a2d33', height: 8, borderRadius: 2 }}
                />

                <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                    {lessons.map((lesson, index) => {
                        // Отримуємо ID уроку (може бути об'єкт або ID)
                        const lessonId = typeof lesson === 'object' ? lesson._id?.toString() : lesson?.toString()
                        const completed = localCompletedLessons.includes(lessonId)
                        const isActive = index === activeLessonIndex
                        // Отримуємо назву уроку, якщо вона є
                        const lessonTitle = typeof lesson === 'object' ? lesson.title : null

                        return (
                            <ListItemButton
                                key={lessonId || index}
                                onClick={() => setActiveLessonIndex(index)}
                                sx={{
                                    mb: 1,
                                    borderRadius: 1,
                                    bgcolor: isActive ? '#2a2d33' : 'transparent',
                                    color: 'white',
                                    opacity: completed ? 0.6 : 1,
                                    '&:hover': { bgcolor: '#2a2d33' }
                                }}
                            >
                                {lessonTitle || `Урок ${index + 1}`} {completed && ' ✓'}
                            </ListItemButton>
                        )
                    })}
                </Box>
            </Box>

            {/* MAIN CONTENT */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

                {/* LESSON TITLE */}
                <Box sx={{ p: 3, borderBottom: '1px solid #ddd' }}>
                    <Typography variant="h4" fontWeight={700}>
                        {activeLesson?.title || `Урок ${activeLessonIndex + 1}`}
                    </Typography>
                    {activeLesson?.duration && (
                        <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                            Тривалість: {activeLesson.duration} хв
                        </Typography>
                    )}
                </Box>

                {/* LESSON CONTENT */}
                <Box sx={{ p: 3, overflowY: 'auto', flexGrow: 1 }}>
                    <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
                        {activeLesson?.videoUrl && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" mb={2}>Відео уроку:</Typography>
                                <Box
                                    component="iframe"
                                    src={activeLesson.videoUrl}
                                    sx={{
                                        width: '100%',
                                        height: '400px',
                                        border: 'none',
                                        borderRadius: 2
                                    }}
                                />
                            </Box>
                        )}
                        {activeLesson?.content ? (
                            <Typography
                                variant="body1"
                                sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}
                            >
                                {activeLesson.content}
                            </Typography>
                        ) : (
                            <>
                                <Typography variant="h6" mb={2}>
                                    Тут буде контент уроку:
                                </Typography>
                                <Typography sx={{ opacity: 0.8 }}>
                                    Відео, текст, приклади, завдання…
                                    Можемо додати відеоплеєр, markdown, код, тести — все що треба.
                                </Typography>
                            </>
                        )}
                    </Paper>
                </Box>

                {/* FOOTER NAVIGATION */}
                <Box sx={{
                    p: 2,
                    borderTop: '1px solid #ddd',
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: '#fff'
                }}>
                    <Button
                        disabled={activeLessonIndex === 0}
                        onClick={() => setActiveLessonIndex(i => i - 1)}
                    >
                        ← Попередній урок
                    </Button>


                    {!isCompleted && (

                        <Button variant="contained" onClick={handleCompleteLesson}>
                            Завершити урок
                        </Button>

                    )}
                    <Button
                        disabled={activeLessonIndex === lessons.length - 1}
                        onClick={() => setActiveLessonIndex(i => i + 1)}
                    >
                        Наступний урок →
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
