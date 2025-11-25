import { useGetCourseByIdQuery } from "@/entities/cource/api/courseApi";
import { useParams } from "react-router";
import {
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
    Container,
    Grid,
    Paper,
    Button,
    Avatar,
    Stack,
    ListItemAvatar,
    ListItemText,
    Alert
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { useAuthRole } from "@/shared/hooks/useAuthRole";
import { useState } from "react";

function CourseDetails() {
    const { isAdmin, isStudent } = useAuthRole();
    const { id } = useParams();
    const { data: course, isLoading, error } = useGetCourseByIdQuery(id);

    const [expanded, setExpanded] = useState(false);
    const [isEnrolling, setIsEnrolling] = useState(false);

    if (isLoading) return <Box sx={{ p: 4, textAlign: "center" }}><LinearProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ mt: 4 }}>Сталася помилка при завантаженні курсу</Alert>;
    if (!course) return <Alert severity="warning" sx={{ mt: 4 }}>Курс не знайдено</Alert>;

    const handleAccordionChange = (panelIndex) => (event, isExpanded) => {
        setExpanded(isExpanded ? panelIndex : false);
    };

    const handleEnroll = () => {
        // TODO: Тут має бути виклик мутації (наприклад, useEnrollCourseMutation)
        setIsEnrolling(true);
        setTimeout(() => {
            alert("Ви успішно записались на курс!");
            setIsEnrolling(false);
        }, 1000);
    };

    // Обчислення прогресу (логіка з вашого коду)
    const progressValue = course.lessons?.length ? ((expanded === false ? 0 : expanded + 1) * (100 / course.lessons.length)) : 0;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Заголовок курсу (Hero section) */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" component="h1" fontWeight={800} gutterBottom>
                    {course.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "800px" }}>
                    {course.description}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Chip icon={<SchoolIcon />} label="Освіта" color="primary" variant="outlined" />
                    <Chip icon={<OndemandVideoIcon />} label={`${course.lessons?.length} Уроків`} variant="outlined" />
                    <Chip icon={<GroupIcon />} label={`${course.users?.length || 0} Студентів`} variant="outlined" />
                </Stack>
            </Box>

            <Grid container spacing={4}>
                {/* ЛІВА КОЛОНКА: Основний контент */}
                <Grid item xs={12} md={8}>

                    {/* Секція прогресу (якщо студент) */}
                    {isStudent && (
                        <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: "rgba(25, 118, 210, 0.04)", borderRadius: 3 }}>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                Ваш прогрес
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <LinearProgress
                                    variant="determinate"
                                    value={progressValue}
                                    sx={{ flex: 1, height: 10, borderRadius: 5 }}
                                />
                                <Typography variant="body2" fontWeight={700} color="primary">
                                    {Math.round(progressValue)}%
                                </Typography>
                            </Box>
                        </Paper>
                    )}

                    {/* Список уроків */}
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                        Програма курсу
                    </Typography>

                    {course.lessons?.map((lesson, index) => {
                        const isLocked = index > (expanded === false ? 0 : expanded); // Приклад логіки блокування

                        return (
                            <Accordion
                                key={index}
                                expanded={expanded === index}
                                onChange={!isLocked ? handleAccordionChange(index) : undefined}
                                disabled={isLocked}
                                sx={{
                                    mb: 1,
                                    borderRadius: "8px !important", // Override default MUI accordion corners
                                    boxShadow: "none",
                                    border: "1px solid",
                                    borderColor: expanded === index ? "primary.main" : "divider",
                                    "&:before": { display: "none" },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={!isLocked ? <ExpandMoreIcon /> : <LockIcon color="disabled" />}
                                    sx={{
                                        backgroundColor: expanded === index ? "rgba(25,118,210,0.04)" : "transparent",
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                        {!isLocked ? (
                                            <PlayCircleOutlineIcon color="primary" sx={{ mr: 2 }} />
                                        ) : (
                                            <LockIcon color="disabled" sx={{ mr: 2 }} />
                                        )}
                                        <Box>
                                            <Typography fontWeight={600} color={expanded === index ? "primary" : "text.primary"}>
                                                {index + 1}. {lesson.title}
                                            </Typography>
                                        </Box>
                                        {isLocked && (
                                            <Chip label="Закрито" size="small" sx={{ ml: "auto", mr: 2, height: 20, fontSize: "0.7rem" }} />
                                        )}
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 3 }}>
                                    <Typography variant="body1" paragraph color="text.secondary">
                                        {lesson.content}
                                    </Typography>

                                    {lesson.videoUrl && (
                                        <Box
                                            sx={{
                                                mt: 2,
                                                position: "relative",
                                                paddingBottom: "56.25%",
                                                height: 0,
                                                overflow: "hidden",
                                                borderRadius: 2,
                                                bgcolor: "#000"
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
                                            />
                                        </Box>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}

                    {/* Адмін панель (список юзерів) */}
                    {isAdmin && course.users?.length > 0 && (
                        <Box sx={{ mt: 6 }}>
                            <Divider sx={{ mb: 3 }} />
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Записані студенти ({course.users.length})
                            </Typography>
                            <Paper variant="outlined" sx={{ borderRadius: 2 }}>
                                <List dense>
                                    {course.users.map((user, index) => (
                                        <ListItem key={index} divider={index !== course.users.length - 1}>
                                            <ListItemAvatar>
                                                <Avatar>{user.name?.[0]}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={user.name} secondary="Студент" />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Box>
                    )}
                </Grid>

                {/* ПРАВА КОЛОНКА: Сайдбар (Інформація та Покупка) */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ position: "sticky", top: 24 }}>
                        <Paper
                            elevation={4}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                overflow: "hidden",
                                borderTop: "6px solid #1976d2"
                            }}
                        >
                            {/* Ціна */}
                            <Typography variant="h3" fontWeight={800} color="text.primary" sx={{ mb: 1 }}>
                                {course.price} грн
                            </Typography>

                            {/* Кнопка ЗАПИСАТИСЬ */}
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={handleEnroll}
                                disabled={isEnrolling}
                                sx={{
                                    mt: 2,
                                    mb: 3,
                                    py: 1.5,
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    boxShadow: "0 4px 14px 0 rgba(25, 118, 210, 0.39)"
                                }}
                            >
                                {isEnrolling ? "Обробка..." : "Записатись на курс"}
                            </Button>

                            <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mb: 3 }}>
                                30-денна гарантія повернення коштів
                            </Typography>

                            <Divider />

                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>
                                    Цей курс містить:
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <OndemandVideoIcon fontSize="small" color="action" />
                                        <Typography variant="body2">{course.lessons?.length} відео-уроків</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <LockIcon fontSize="small" color="action" />
                                        <Typography variant="body2">Повний довічний доступ</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <CheckCircleIcon fontSize="small" color="action" />
                                        <Typography variant="body2">Сертифікат про закінчення</Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Paper>

                        {/* Картка викладача */}
                        <Paper variant="outlined" sx={{ mt: 3, p: 3, borderRadius: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Викладач
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar
                                    src={course?.teacher?.avatarUrl}
                                    alt={course?.teacher?.name}
                                    sx={{ width: 56, height: 56 }}
                                >
                                    {course?.teacher?.name?.[0]}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                                        {course?.teacher?.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Експерт курсу
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CourseDetails;