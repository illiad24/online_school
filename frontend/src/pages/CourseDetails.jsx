import { useGetCourseByIdQuery } from "@/entities/cource/api/courseApi";
import { useParams } from "react-router";
import {
    Card,
    CardContent,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Divider,
    LinearProgress,
    List,
    ListItem,
    Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
import { useAuthRole } from "@/shared/hooks/useAuthRole";
import { useState, Fragment } from "react";

function CourseDetails() {
    const { isAdmin, isStudent } = useAuthRole();
    const { id } = useParams();
    const { data: course, isLoading, error } = useGetCourseByIdQuery(id);
    const [expanded, setExpanded] = useState(false);

    if (isLoading) return <Typography>Завантаження...</Typography>;
    if (error) return <Typography color="error">Сталася помилка при завантаженні курсу</Typography>;
    if (!course) return <Typography>Курс не знайдено</Typography>;

    const handleAccordionChange = (panelIndex) => (event, isExpanded) => {
        setExpanded(isExpanded ? panelIndex : false);
    };

    return (
        <Card
            sx={{
                maxWidth: 800,
                margin: "40px auto",
                borderRadius: 4,
                boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                    color: "#fff",
                    py: 3,
                    px: 4,
                }}
            >
                <Typography variant="h4" fontWeight={700}>
                    {course.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    {course.description}
                </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Викладач:</strong> {course?.teacher?.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Ціна:</strong> {course.price} грн
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
                    <Typography variant="h6">Уроки ({course.lessons?.length})</Typography>
                    <LinearProgress
                        variant="determinate"
                        value={(expanded + 1) * (100 / course.lessons.length)}
                        sx={{ flex: 1, height: 8, borderRadius: 5 }}
                    />
                </Box>

                {course.lessons?.map((lesson, index) => {
                    const isLocked = index > expanded; // якщо попередні не відкриті
                    return (
                        <Accordion
                            key={index}
                            expanded={expanded === index}
                            onChange={!isLocked ? handleAccordionChange(index) : undefined}
                            disabled={isLocked}
                            sx={{
                                mb: 1.5,
                                borderRadius: 2,
                                "&.Mui-disabled": {
                                    backgroundColor: "rgba(0,0,0,0.03)",
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={!isLocked ? <ExpandMoreIcon /> : <LockIcon color="disabled" />}
                                sx={{
                                    backgroundColor: expanded === index ? "rgba(25,118,210,0.08)" : "background.paper",
                                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                                }}
                            >
                                <Typography sx={{ fontWeight: 600 }}>
                                    {index + 1}. {lesson.title}
                                </Typography>
                                {isLocked && (
                                    <Chip
                                        label="Заблоковано"
                                        color="default"
                                        size="small"
                                        sx={{ ml: 2, opacity: 0.6 }}
                                    />
                                )}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="body2" sx={{ mb: 2 }}>
                                        {lesson.content}
                                    </Typography>

                                    {lesson.videoUrl && (
                                        <Box
                                            sx={{
                                                position: "relative",
                                                paddingBottom: "56.25%",
                                                height: 0,
                                                overflow: "hidden",
                                                borderRadius: 2,
                                                boxShadow: 3,
                                            }}
                                        >
                                            <iframe
                                                src={lesson.videoUrl}
                                                title={`Урок ${index + 1}`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    border: 0,
                                                }}
                                            ></iframe>
                                        </Box>
                                    )}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}

                <Divider sx={{ my: 3 }} />

                {isAdmin && (
                    <Fragment>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Користувачі ({course.users?.length})
                        </Typography>
                        <List dense>
                            {course.users?.map((user, index) => (
                                <ListItem key={index}>{user.name}</ListItem>
                            ))}
                        </List>
                    </Fragment>
                )}

                {isStudent && (
                    <Typography variant="h6">
                        Кількість учасників: {course.users?.length}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default CourseDetails;
