import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Stack,
    CardMedia,
    LinearProgress,
    Chip,
    Button,
    useMediaQuery,
    Divider,
    IconButton,
} from "@mui/material";
import { Link } from "react-router";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import {
    ChevronRight,
    School,
    AccessTime,
    CalendarToday,
    CheckCircleOutline,
} from "@mui/icons-material";

function MyCourseItem({ enrollment }) {
    const course = enrollment?.course;
    const progress = enrollment?.progress || 0;

    const isCompleted = progress >= 100;
    const lessonsTotal = course?.lessons.length || 0;
    const lessonsDone = enrollment?.completedLessons.length || 0;
    const startDate = enrollment?.enrolledAt ? new Date(enrollment.enrolledAt) : null;
    const lastActive = enrollment?.lastActivityAt ? new Date(enrollment.lastActivityAt) : null;
    const certificateAvailable = course?.certificate === true;

    const isMobile = useMediaQuery("(max-width:1100px)");
    const isSmallMobile = useMediaQuery("(max-width:450px)");

    // Визначаємо колір для прогресу/кнопки
    const progressColor = isCompleted ? "#00c853" : "#ff9800"; // Зелений для завершено, помаранчевий для в процесі

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                borderRadius: "20px",
                overflow: "hidden",
                marginBottom: 4,
                // Сучасний фон з легким градієнтом та тінь
                background: "#ffffff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "0.3s cubic-bezier(.25,.8,.5,1)",
                position: "relative",
                border: "1px solid #f0f0f5",
                "&:hover": {
                    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                },
            }}
        >
            {/* IMAGE/MEDIA BLOCK */}
            <Box
                sx={{
                    width: isMobile ? "100%" : "300px",
                    minHeight: "200px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                }}
            >
                <CardMedia
                    component="img"
                    src={course?.image}
                    alt={course?.title}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "0.5s",
                        filter: "brightness(0.9)",
                        "&:hover": {
                            transform: "scale(1.05)",
                            filter: "brightness(1)",
                        }
                    }}
                />

                {/* Glassmorphism Overlay for Status/Progress */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 1.5,
                        // Ефект Glassmorphism
                        backdropFilter: "blur(10px) saturate(180%)",
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "white",
                    }}
                >
                    <Chip
                        icon={isCompleted ? <CheckCircleOutline /> : <AccessTime />}
                        label={isCompleted ? "Завершено" : "В процесі"}
                        size="small"
                        sx={{
                            backgroundColor: isCompleted ? "rgba(0, 200, 83, 0.9)" : "rgba(255, 152, 0, 0.9)",
                            color: "white",
                            fontWeight: 600,
                            px: 0.5,
                            borderRadius: "6px",
                        }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 700, color: "white" }}>
                        {progress}%
                    </Typography>
                </Stack>
            </Box>

            {/* CONTENT */}
            <CardContent sx={{ flex: 1, p: isMobile ? 3 : 4, pr: 2 }}>
                <Stack spacing={2.5} height="100%">
                    {/* Title */}
                    <Typography
                        variant="h5"
                        component={Link}
                        to={`/courses/${course?._id}`}
                        sx={{
                            textDecoration: "none",
                            color: "#333",
                            fontWeight: 800,
                            lineHeight: 1.3,
                            fontSize: isMobile ? "1.35rem" : "1.6rem",
                            transition: "color 0.2s",
                            "&:hover": { color: "#1976d2" },
                        }}
                    >
                        {course?.title}
                    </Typography>

                    {/* Teacher & Certificate */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                            variant="body2"
                            sx={{ color: "#6c757d", fontSize: "0.95rem", display: 'flex', alignItems: 'center' }}
                        >
                            <School sx={{ fontSize: '1.1rem', mr: 0.8, color: '#999' }} />
                            Викладач: <b style={{ color: "#333", marginLeft: '6px' }}>{course?.teacher?.name}</b>
                        </Typography>

                        {certificateAvailable && (
                            <Chip
                                label="Сертифікат"
                                size="small"
                                sx={{
                                    backgroundColor: "#e3f2fd",
                                    color: "#1e88e5",
                                    fontWeight: 700,
                                    borderRadius: "8px",
                                    fontSize: "0.75rem",
                                    display: isSmallMobile ? 'none' : 'flex', // Приховуємо на дуже малих екранах
                                }}
                            />
                        )}
                    </Stack>

                    {/* PROGRESS BAR & INFO */}
                    <Box sx={{ mt: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: progressColor }}>
                                Прогрес навчання
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "#555" }}>
                                {lessonsDone} з {lessonsTotal} уроків
                            </Typography>
                        </Stack>

                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 10,
                                borderRadius: "8px",
                                backgroundColor: "#e9ecef",
                                "& .MuiLinearProgress-bar": {
                                    borderRadius: "8px",
                                    transition: "0.6s ease",
                                    background: isCompleted
                                        ? "linear-gradient(90deg, #66bb6a, #00c853)"
                                        : "linear-gradient(90deg, #ffb300, #ff9800)",
                                },
                            }}
                        />
                    </Box>

                    {/* INFO GRID - Адаптивний та більш компактний */}
                    <Divider sx={{ my: 1.5 }} />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: isSmallMobile ? "column" : "row",
                            justifyContent: "space-between",
                            gap: 2,
                            mt: 1,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarToday sx={{ fontSize: '1.2rem', mr: 1, color: '#999' }} />
                            <Stack>
                                <Typography variant="caption" sx={{ color: "#8d8d95" }}>
                                    Початок
                                </Typography>
                                <Typography sx={{ fontWeight: 600, color: "#444" }}>
                                    {startDate?.toLocaleDateString?.() || "-"}
                                </Typography>
                            </Stack>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTime sx={{ fontSize: '1.2rem', mr: 1, color: '#999' }} />
                            <Stack>
                                <Typography variant="caption" sx={{ color: "#8d8d95" }}>
                                    Ост. активність
                                </Typography>
                                <Typography sx={{ fontWeight: 600, color: "#444" }}>
                                    {lastActive?.toLocaleDateString?.() || "-"}
                                </Typography>
                            </Stack>
                        </Box>

                        {/* Button as part of the info row on larger screens */}
                        {!isMobile && (
                            <Button
                                variant="contained"
                                component={Link}
                                to={navigateRoutes.navigate.courses.courseLearn(course?._id)}
                                endIcon={<ChevronRight />}
                                sx={{
                                    px: 3,
                                    py: 0.8,
                                    fontWeight: 700,
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    fontSize: "0.9rem",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    backgroundColor: progressColor,
                                    "&:hover": {
                                        backgroundColor: progressColor,
                                        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                                    },
                                    alignSelf: 'center', // Вирівнювання по центру в Stack
                                }}
                            >
                                {isCompleted ? "Переглянути" : "Продовжити"}
                            </Button>
                        )}
                    </Box>

                    {/* BUTTON for mobile (Full width) */}
                    {isMobile && (
                        <Box sx={{ pt: 1 }}>
                            <Button
                                variant="contained"
                                component={Link}
                                to={navigateRoutes.navigate.courses.courseLearn(course?._id)}
                                endIcon={<ChevronRight />}
                                fullWidth
                                sx={{
                                    py: 1.2,
                                    fontWeight: 700,
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    backgroundColor: progressColor,
                                    "&:hover": {
                                        backgroundColor: progressColor,
                                        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                                    },
                                }}
                            >
                                {isCompleted ? "Переглянути матеріали" : "Продовжити навчання"}
                            </Button>
                        </Box>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default MyCourseItem;