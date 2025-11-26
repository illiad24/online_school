import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import {
    Box, Typography, Button, LinearProgress, List, ListItemButton,
    Paper, Fade, Drawer, useMediaQuery, useTheme, IconButton,
    Container
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import LockIcon from '@mui/icons-material/Lock'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MenuIcon from '@mui/icons-material/Menu' // Іконка меню для мобільної версії
import CloseIcon from '@mui/icons-material/Close' // Іконка закриття

import { useAuthRole } from '@/shared/hooks/useAuthRole'
import { useCompleteLessonMutation, useGetEnrollmentByCourseQuery } from '@/entities/enrollment/enrollmentApi'

// Ширина бічної панелі
const SIDEBAR_WIDTH = 320
// Колір акценту
const primaryColor = '#1976d2'
const mainBg = '#f4f6f8'

export default function CourseProgressPage() {
    const { courseId } = useParams()
    const { user } = useAuthRole()
    const theme = useTheme()
    // Визначаємо, чи екран є мобільним (наприклад, менше 'md')
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))


    const userId = user?._id || user?.id

    const { data: enrollment, isLoading: enrollmentLoading } = useGetEnrollmentByCourseQuery({ userId, courseId })


    const loading = enrollmentLoading
    const course = enrollment?.course

    // RTK Query мутація для завершення уроку
    const [completeLesson, { isLoading: isCompletingLesson }] = useCompleteLessonMutation()


    const [activeLessonIndex, setActiveLessonIndex] = useState(0)
    const [localCompletedLessons, setLocalCompletedLessons] = useState([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false) // Стан для відкриття/закриття на мобільних пристроях

    const completedLessons = enrollment?.completedLessons

    // Ефект для ініціалізації стану та визначення першого незавершеного уроку
    useEffect(() => {
        if (enrollment && course && course.lessons) {
            setLocalCompletedLessons(completedLessons)

            const nextIndex = course.lessons.findIndex(lesson => {
                const lessonId = typeof lesson === 'object' ? lesson._id?.toString() : lesson?.toString()
                return !completedLessons.includes(lessonId)
            })

            if (nextIndex !== -1) setActiveLessonIndex(nextIndex)
            else if (course.lessons.length > 0) setActiveLessonIndex(course.lessons.length - 1)
        }
    }, [course, enrollment, completedLessons])

    if (loading) return <p>Loading...</p>

    const lessons = course?.lessons || []
    const activeLesson = lessons[activeLessonIndex]

    const progress = enrollment?.progress
    const isCompleted = enrollment?.status === 'completed'

    const activeLessonId = activeLesson ? (typeof activeLesson === 'object' ? activeLesson._id?.toString() : activeLesson.toString()) : null
    const isLessonCompleted = activeLessonId ? localCompletedLessons.includes(activeLessonId) : false

    const isLastLesson = activeLessonIndex === lessons.length - 1

    /**
     * Перевірка, чи попередній урок завершений
     */
    const isPreviousLessonCompleted = (index) => {
        if (index === 0) return true
        const prevLesson = lessons[index - 1]
        const prevLessonId = typeof prevLesson === 'object' ? prevLesson._id?.toString() : prevLesson?.toString()
        return localCompletedLessons.includes(prevLessonId)
    }

    /**
     * Обробник завершення уроку
     */
    async function handleCompleteLesson() {
        if (!enrollment || !activeLessonId || isLessonCompleted || isCompletingLesson) return

        try {
            setLocalCompletedLessons(prev => [...prev, activeLessonId])

            await completeLesson({ userId, courseId, lessonId: activeLessonId }).unwrap()

            if (!isLastLesson) {
                // Перехід на наступний урок після завершення
                setActiveLessonIndex(i => i + 1)
            }

        } catch (error) {
            console.error("Не вдалося завершити урок:", error)
            setLocalCompletedLessons(prev => prev.filter(id => id !== activeLessonId))
        }
    }

    /**
     * Обробник переходу на наступний урок
     */
    function handleNextLesson() {
        if (activeLessonIndex < lessons.length - 1) {
            setActiveLessonIndex(i => i + 1)
        }
    }

    /**
     * Обробник переходу на попередній урок
     */
    function handlePrevLesson() {
        if (activeLessonIndex > 0) {
            setActiveLessonIndex(i => i - 1)
        }
    }

    // Компонент, який містить список уроків (бічна панель)
    const SidebarContent = (
        <Box sx={{
            width: SIDEBAR_WIDTH,
            borderRight: isMobile ? 'none' : '1px solid #e0e0e0',
            bgcolor: '#ffffff',
            color: '#333',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            height: isMobile ? '100%' : 'auto',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#222' }}>
                    {course?.title}
                </Typography>
                {isMobile && (
                    <IconButton onClick={() => setIsSidebarOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>
            <Box sx={{ borderBottom: '1px solid #e0e0e0', my: 2 }} />

            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 500 }}>Прогрес курсу</Typography>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ mb: 3, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: primaryColor }, height: 8, borderRadius: 4 }}
            />
            <Box sx={{ borderBottom: '1px solid #e0e0e0', mb: 2 }} />


            <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                <List disablePadding>
                    {lessons.map((lesson, index) => {
                        const lessonId = typeof lesson === 'object' ? lesson._id?.toString() : lesson?.toString()
                        const completed = localCompletedLessons.includes(lessonId)
                        const isActive = index === activeLessonIndex
                        const lessonTitle = typeof lesson === 'object' ? lesson.title : null
                        const isLocked = !isPreviousLessonCompleted(index) && index !== 0

                        return (
                            <ListItemButton
                                key={lessonId || index}
                                disabled={isLocked}
                                onClick={() => {
                                    setActiveLessonIndex(index)
                                    if (isMobile) setIsSidebarOpen(false) // Закриваємо панель після вибору уроку
                                }}
                                sx={{
                                    mb: 1,
                                    borderRadius: 1.5,
                                    bgcolor: isActive ? primaryColor : (isLocked ? '#fafafa' : 'transparent'),
                                    color: isActive ? 'white' : (isLocked ? '#aaa' : '#333'),
                                    opacity: isLocked ? 0.7 : 1,
                                    '&:hover': {
                                        bgcolor: isActive ? primaryColor : (isLocked ? '#fafafa' : '#f0f0f0'),
                                        color: isActive ? 'white' : (isLocked ? '#aaa' : primaryColor),
                                    },
                                    transition: 'all 0.2s',
                                    boxShadow: isActive ? '0 2px 5px rgba(0,0,0,0.2)' : 'none'
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    {isLocked ? (
                                        <LockIcon sx={{ mr: 1, color: '#aaa', fontSize: 20 }} />
                                    ) : completed ? (
                                        <CheckCircleIcon sx={{ mr: 1, color: isActive ? 'white' : 'success.main', fontSize: 20 }} />
                                    ) : (
                                        <RadioButtonUncheckedIcon sx={{ mr: 1, color: isActive ? 'white' : '#777', fontSize: 20 }} />
                                    )}

                                    <Typography sx={{ flexGrow: 1, fontWeight: isActive ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {lessonTitle || `Урок ${index + 1}`}
                                    </Typography>

                                    {isActive && (
                                        <Typography variant="caption" sx={{ ml: 1, bgcolor: 'rgba(255,255,255,0.2)', px: 1, borderRadius: 1 }}>
                                            Активний
                                        </Typography>
                                    )}
                                </Box>
                            </ListItemButton>
                        )
                    })}
                </List>
            </Box>
        </Box>
    )

    return (
        <Container maxWidth='lg' sx={{ display: 'flex', height: '100vh', bgcolor: mainBg }}>

            {/* БІЧНА ПАНЕЛЬ (НАВІГАЦІЯ) - ДЕСКТОП */}
            {!isMobile && (
                <Box sx={{
                    width: SIDEBAR_WIDTH,
                    flexShrink: 0, // Запобігає зменшенню ширини
                    boxShadow: '4px 0 10px rgba(0,0,0,0.05)'
                }}>
                    {SidebarContent}
                </Box>
            )}

            {/* БІЧНА ПАНЕЛЬ (НАВІГАЦІЯ) - МОБІЛЬНА ВИСУВНА ПАНЕЛЬ */}
            {isMobile && (
                <Drawer
                    anchor="left"
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    PaperProps={{
                        sx: { width: SIDEBAR_WIDTH }
                    }}
                >
                    {SidebarContent}
                </Drawer>
            )}

            {/* ОСНОВНИЙ КОНТЕНТ */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

                {/* HEADER (містить кнопку меню для мобільної версії) */}
                <Box sx={{
                    p: 3,
                    borderBottom: '1px solid #e0e0e0',
                    bgcolor: '#fff',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    {isMobile && (
                        <IconButton
                            onClick={() => setIsSidebarOpen(true)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Box>
                        <Typography variant={isMobile ? "h5" : "h4"} fontWeight={700} color="text.primary">
                            {activeLesson?.title || `Урок ${activeLessonIndex + 1}`}
                        </Typography>
                        {activeLesson?.duration && (
                            <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                                **Тривалість:** {activeLesson.duration} хв
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* КОНТЕНТ УРОКУ */}
                <Box sx={{ p: isMobile ? 2 : 3, overflowY: 'auto', flexGrow: 1 }}>
                    <Paper elevation={3} sx={{ p: isMobile ? 3 : 4, borderRadius: 3, bgcolor: '#ffffff' }}>

                        {/* Відео */}
                        {activeLesson?.videoUrl && (
                            <Box sx={{ mb: 4, pb: 4, borderBottom: '1px solid #f0f0f0' }}>
                                <Typography variant="h6" mb={2} fontWeight={600} color={primaryColor}>Відео уроку</Typography>
                                <Box
                                    component="iframe"
                                    src={activeLesson.videoUrl}
                                    sx={{
                                        width: '100%',
                                        height: isMobile ? '250px' : '500px', // Менша висота на мобільних
                                        border: 'none',
                                        borderRadius: 2,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                    }}
                                    allowFullScreen
                                />
                            </Box>
                        )}

                        {/* Текст контенту */}
                        {activeLesson?.content ? (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6" mb={2} fontWeight={600} color="text.secondary">Матеріали уроку</Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}
                                >
                                    {activeLesson.content}
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ mt: 3, p: 3, border: '2px dashed #ccc', borderRadius: 2 }}>
                                <Typography variant="h6" mb={2} color="text.secondary">
                                    Контент уроку відсутній
                                </Typography>
                                <Typography sx={{ opacity: 0.8 }}>
                                    Будь ласка, зачекайте на оновлення.
                                </Typography>
                            </Box>
                        )}

                        {/* Індикатор завершення в контенті */}
                        {isLessonCompleted && (
                            <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
                                <Typography variant="h5" color="success.main" fontWeight={700}>
                                    Урок успішно завершено! 🎉
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Box>

                {/* ПАНЕЛЬ НАВІГАЦІЇ ВНИЗУ (FOOTER) */}
                <Box sx={{
                    p: isMobile ? 1.5 : 2, // Менший відступ на мобільних
                    borderTop: '1px solid #e0e0e0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: '#fff',
                    boxShadow: '0 -2px 5px rgba(0,0,0,0.05)',
                    flexDirection: isMobile ? 'row' : 'row', // Зберігаємо row, але кнопки будуть flex: 1
                    gap: isMobile ? 1 : 2
                }}>
                    {/* Кнопка "Попередній урок" */}
                    <Button
                        variant="outlined"
                        disabled={activeLessonIndex === 0}
                        onClick={handlePrevLesson}
                        startIcon={<ArrowBackIcon />}
                        fullWidth={isMobile} // На повну ширину на мобільних
                        sx={{ color: primaryColor, borderColor: primaryColor }}
                    >
                        {isMobile ? 'Назад' : 'Попередній урок'}
                    </Button>


                    {/* Кнопка "Завершити урок" */}
                    {!isLessonCompleted && !isCompleted && activeLessonId && (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleCompleteLesson}
                            disabled={isCompletingLesson}
                            fullWidth={isMobile} // На повну ширину на мобільних
                        >
                            {isCompletingLesson ? 'Завершення...' : 'Завершити урок'}
                        </Button>
                    )}

                    {/* Кнопка "Наступний урок" */}
                    <Button
                        variant="outlined"
                        disabled={isLastLesson || !isLessonCompleted}
                        onClick={handleNextLesson}
                        endIcon={<ArrowForwardIcon />}
                        fullWidth={isMobile} // На повну ширину на мобільних
                        sx={{
                            color: isLessonCompleted && !isLastLesson ? primaryColor : '#aaa',
                            borderColor: isLessonCompleted && !isLastLesson ? primaryColor : '#e0e0e0',
                            bgcolor: isLessonCompleted && !isLastLesson ? '#e3f2fd' : 'transparent',
                            '&:hover': {
                                bgcolor: isLessonCompleted && !isLastLesson ? '#c8e6fc' : 'transparent',
                            }
                        }}
                    >
                        {isMobile ? 'Вперед' : 'Наступний урок'}
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}