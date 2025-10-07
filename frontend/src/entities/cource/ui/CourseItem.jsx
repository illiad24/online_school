import React from 'react'
import { Card, CardContent, Typography, Box, Stack, Divider, CardMedia, Chip } from '@mui/material'
import LessonForm from '@/widgets/lesson/SelectLesson'
import { Link } from 'react-router'
import { navigateRoutes } from '@/shared/config/routes/navigateRoutes'


export function CourseItem({ course, actions, isAddingLesson }) {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 3,
                transition: "transform 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
            }}
        >
            {/* Зображення */}
            <CardMedia
                component="img"
                image={course?.image || "/images/default-course.jpg"}
                alt={course?.title}
                sx={{
                    width: { xs: "100%", sm: 300 },
                    height: { xs: 200, sm: "auto" },
                    objectFit: "cover",
                }}
            />

            {/* Контент */}
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Stack spacing={1.5}>
                    {/* Категорія */}
                    <Chip
                        label={course?.category || "Marketing"}
                        color="success"
                        size="small"
                        sx={{
                            alignSelf: "flex-start",
                            fontWeight: 600,
                            borderRadius: "6px",
                        }}
                    />

                    {/* Назва курсу */}
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
                        {course?.title || "The Ultimate Google Ads Training Course"}
                    </Typography>

                    {/* Ціна і автор */}
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        <Box component="span" sx={{ color: "error.main", fontWeight: 700 }}>
                            ${course?.price || 100}
                        </Box>{" "}
                        |{" "}
                        <Box component="span" sx={{ color: "text.secondary" }}>
                            by {course?.author || "Jerome Bell"}
                        </Box>
                    </Typography>
                </Stack>

                {/* Додаткові дії */}
                {actions?.length > 0 && (
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        {actions.map((action, i) => (
                            <React.Fragment key={i}>{action}</React.Fragment>
                        ))}
                    </Stack>
                )}

                {/* Форма додавання уроку */}
                {isAddingLesson && (
                    <Box sx={{ mt: 2 }}>
                        <LessonForm courseId={course._id} />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}

export default CourseItem
