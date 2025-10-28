import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, Typography, Box, Stack, Divider, CardMedia, Chip } from '@mui/material'
import LessonForm from '@/widgets/lesson/SelectLesson'
import { Link } from 'react-router'


import { motion } from "framer-motion"; // <- для плавної анімації

export function CourseItem({ course, actions, isAddingLesson }) {
    const cardRef = useRef(null);
    const [flexDirection, setFlexDirection] = useState("row");

    useEffect(() => {
        const parent = cardRef.current?.parentElement;
        if (!parent) return;

        const updateDirection = () => {
            if (parent.classList.contains("grid-view")) {
                setFlexDirection("column");
            } else {
                setFlexDirection("row");
            }
        };

        updateDirection(); // початкове визначення
        const observer = new MutationObserver(updateDirection);
        observer.observe(parent, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div layout ref={cardRef}>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: flexDirection,
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 3,
                    gap: 3,
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
                    image={course?.courseImage}
                    alt={course?.title}
                    sx={{
                        maxWidth: '200px',
                        objectFit: "cover",
                        padding: 2,
                    }}
                />

                {/* Контент */}
                <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", p: 3 }}>
                    <Stack spacing={1}>
                        <Chip
                            label={course?.category || "Marketing"}
                            color="success"
                            size="small"
                            sx={{ fontWeight: 600, borderRadius: 1, alignSelf: "flex-start" }}
                        />
                        <Typography
                            variant="h6"
                            component={Link}
                            to={`/courses/${course?._id}`}
                            sx={{ textDecoration: "none", color: "text.primary", fontWeight: 700, "&:hover": { color: "primary.main" } }}
                        >
                            {course?.title || "Untitled Course"}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            <Box component="span" sx={{ color: "error.main", fontWeight: 700 }}>
                                ${course?.price || 0}
                            </Box>{" "}
                            |{" "}
                            <Box component="span" sx={{ color: "text.secondary" }}>
                                by {course?.author || "Unknown"}
                            </Box>
                        </Typography>
                    </Stack>

                    {actions?.length > 0 && (
                        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            {actions.map((action, i) => (
                                <Box key={i}>{action}</Box>
                            ))}
                        </Stack>
                    )}

                    {isAddingLesson && (
                        <Box sx={{ mt: 2 }}>
                            <LessonForm courseId={course._id} />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default CourseItem
