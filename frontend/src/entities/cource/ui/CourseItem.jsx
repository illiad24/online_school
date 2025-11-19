import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Stack,
    CardMedia,
    Chip,
    Divider,
} from "@mui/material";
import LessonForm from "@/widgets/lesson/SelectLesson";
import { Link } from "react-router";

export function CourseItem({ course, actions, isAddingLesson, layout }) {



    return ( 
        <Card
            sx={{
                display: layout === "inline-view" ? "flex" : "flex",
                flexDirection: layout === "inline-view" ? "row" : "column",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                background: "linear-gradient(145deg, #ffffff, #f8faff)",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                },
            }}
        >
            {/* Зображення курсу */}
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    width: layout === "inline-view" ? "260px" : "100%",
                    height: layout === "inline-view" ? "auto" : "220px",
                    flexShrink: 0,
                }}
            >
                <CardMedia
                    component="img"
                    image={course?.image || "/images/default-course.jpg"}
                    alt={course?.title}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                        "&:hover": { transform: "scale(1.05)" },
                    }}
                />

                <Chip
                    label={course?.category || "General"}
                    color="primary"
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        fontWeight: 600,
                        borderRadius: "6px",
                        backgroundColor: "rgba(25,118,210,0.9)",
                        color: "white",
                    }}
                />
            </Box>

            {/* Контент */}
            <CardContent
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 3,
                    gap: 1.5,
                }}
            >
                <Stack spacing={1}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to={`/courses/${course?._id}`}
                        sx={{
                            textDecoration: "none",
                            color: "text.primary",
                            fontWeight: 700,
                            transition: "color 0.3s ease",
                            "&:hover": { color: "primary.main" },
                        }}
                    >
                        {course?.title || "Без назви курсу"}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {course?.description || "Опис курсу буде додано пізніше."}
                    </Typography>

                    <Divider sx={{ my: 1.5 }} />

                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        <Box component="span" sx={{ color: "error.main", fontWeight: 700 }}>
                            ${course?.price || 0}
                        </Box>{" "}
                        |{" "}
                        <Box component="span" sx={{ color: "text.secondary" }}>
                            від {course?.teacher?.name || "невідомого автора"}
                        </Box>
                    </Typography>
                </Stack>

                {/* Дії */}
                {actions?.length > 0 && (
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            mt: 2,
                            flexWrap: "wrap",
                            gap: 1,
                            "& button": {
                                borderRadius: "8px",
                                fontSize: "0.85rem",
                                px: 2,
                                py: 0.5,
                            },
                        }}
                    >
                        {actions.map((action, i) => (
                            <Box key={i}>{action}</Box>
                        ))}
                    </Stack>
                )}

                {/* Форма уроків */}
                {isAddingLesson && (
                    <Box sx={{ mt: 2 }}>
                        <LessonForm courseId={course._id} />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}

export default CourseItem;
