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
} from "@mui/material";
import { Link } from "react-router";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";

function MyCourseItem({ enrollment }) {
    console.log(enrollment);

    const course = enrollment?.course
    const progress = enrollment?.progress || 0;
    console.log(course);

    const isCompleted = progress >= 100;
    const lessonsTotal = course?.lessons.length || 0;
    const lessonsDone = enrollment?.completedLessons.length || 0;
    const startDate = enrollment?.enrolledAt ? new Date(enrollment.enrolledAt) : null;
    const lastActive = enrollment?.lastActivityAt ? new Date(enrollment.lastActivityAt) : null;
    const certificateAvailable = course?.certificate === true;

    // Mobile adaptation
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                background: "linear-gradient(145deg, #ffffff, #f8faff)",
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                },
            }}
        >
            {/* Image */}
            <Box
                sx={{
                    width: isMobile ? "100%" : "260px",
                    height: isMobile ? "180px" : "180px",
                    overflow: "hidden",
                }}
            >
                <CardMedia
                    component="img"
                    image={course?.image}
                    alt={course?.title}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </Box>

            {/* Content */}
            <CardContent sx={{ flex: 1, p: 3 }}>
                <Stack spacing={1.6}>
                    {/* Title */}
                    <Typography
                        variant="h6"
                        component={Link}
                        to={`/courses/${course?._id}`}
                        sx={{
                            textDecoration: "none",
                            color: "text.primary",
                            fontWeight: 700,
                            "&:hover": { color: "primary.main" },
                        }}
                    >
                        {course?.title}
                    </Typography>

                    {/* Teacher */}
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Викладач: {course?.teacher?.name}
                    </Typography>

                    {/* Lesson progress */}
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Уроки:{" "}
                        <b>
                            {lessonsDone}/{lessonsTotal}
                        </b>
                    </Typography>

                    {/* Dates */}
                    <Stack direction="row" spacing={2}>
                        {startDate && (
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                Почато: {startDate.toLocaleDateString()}
                            </Typography>
                        )}

                        {lastActive && (
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                Останнє відвудування: {lastActive.toLocaleDateString()}
                            </Typography>
                        )}
                    </Stack>

                    {/* Certificate */}
                    {certificateAvailable && (
                        <Chip
                            label="Сертифікат доступний"
                            color="success"
                            sx={{
                                fontWeight: 600,
                                borderRadius: "6px",
                                width: "fit-content",
                            }}
                        />
                    )}

                    {/* Progress */}
                    <Box sx={{ mt: 1, width: "100%" }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography variant="body2" fontWeight={600}>
                                Прогрес:
                            </Typography>
                            <Typography variant="body2">{progress}%</Typography>
                        </Stack>

                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                mt: 1,
                                height: 10,
                                borderRadius: "6px",
                                transition: "all 0.6s ease", // Animation
                                "& .MuiLinearProgress-bar": {
                                    transition: "transform 0.6s ease",
                                },
                            }}
                        />
                    </Box>

                    {/* Status */}
                    <Box mt={1}>
                        {isCompleted ? (
                            <Chip
                                label="Завершено"
                                color="success"
                                sx={{ fontWeight: 600, borderRadius: "6px" }}
                            />
                        ) : (
                            <Chip
                                label="У процесі"
                                color="primary"
                                sx={{ fontWeight: 600, borderRadius: "6px" }}
                            />
                        )}
                    </Box>

                    {/* Action button */}
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            color={isCompleted ? "success" : "primary"}
                            component={Link}
                            to={navigateRoutes.navigate.courses.courseLearn(course?._id)}
                            sx={{
                                px: 3,
                                py: 1,
                                borderRadius: "10px",
                                fontWeight: 600,
                                width: isMobile ? "100%" : "auto",
                            }}
                        >
                            {isCompleted
                                ? "Переглянути матеріали"
                                : "Продовжити навчання"}
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default MyCourseItem;
