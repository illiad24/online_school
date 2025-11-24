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
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Link } from "react-router";
import {
    AttachMoney,
    School,
    MenuBook,
    VerifiedUser,
    ChevronRight,
} from "@mui/icons-material";
import LessonForm from "@/widgets/lesson/SelectLesson";

export function CourseItem({ course, actions, layout }) {
    const theme = useTheme();
    // Визначення світлих преміальних кольорів
    const ACCENT_COLOR = "#1976d2"; // Глибокий синій
    const BACKGROUND_COLOR = "#fefefe"; // Майже ідеально білий
    const BORDER_COLOR = "#e0e7f1"; // Дуже світлий сіро-синій

    const isInline = layout === "inline-view";
    const isMobile = useMediaQuery(theme.breakpoints.down(isInline ? 'sm' : 'md'));
    const isCard = !isInline || isMobile;

    // Динамічні стилі для Card
    const cardStyles = {
        display: "flex",
        flexDirection: isCard ? "column" : "row",
        borderRadius: "24px",
        overflow: "hidden",
        background: BACKGROUND_COLOR,
        color: theme.palette.text.primary,

        // Витончена, "м'яка" тінь
        boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        transition: "transform 0.4s cubic-bezier(.25,.8,.5,1), box-shadow 0.4s cubic-bezier(.25,.8,.5,1)",
        border: `1px solid ${BORDER_COLOR}`,

        "&:hover": {
            transform: "translateY(-8px)", // Трохи менший підйом, ніж у Dark Mode
            boxShadow: `0 15px 45px rgba(0,0,0,0.15), 0 0 10px ${ACCENT_COLOR}10`,
        },
    };

    // Динамічні стилі для зображення
    const mediaBoxStyles = {
        position: "relative",
        overflow: "hidden",
        width: isInline && !isMobile ? "350px" : "100%",
        minHeight: isInline && !isMobile ? "100%" : "250px",
        flexShrink: 0,
        // Обрізка кутів зображення для відповідності Card
        borderRadius: isCard ? '24px 24px 0 0' : '24px 0 0 24px',
    };

    return (
        <Card sx={cardStyles}>
            {/* Зображення курсу */}
            <Box sx={mediaBoxStyles}>
                <CardMedia
                    component="img"
                    image={course?.image || "/images/default-course.jpg"}
                    alt={course?.title}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(1) contrast(1)",
                        transition: "transform 0.5s ease",
                        "&:hover": {
                            transform: "scale(1.1)",
                            filter: "brightness(1.05) contrast(1.05)" // Легке освітлення при наведенні
                        },
                    }}
                />

                {/* Badge: Category & Certification (Glassmorphism Light) */}
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        position: "absolute",
                        top: 18,
                        left: 18,
                    }}
                >
                    <Chip
                        label={course?.category || "Загальний"}
                        size="medium"
                        sx={{
                            fontWeight: 700,
                            borderRadius: "10px",
                            backgroundColor: ACCENT_COLOR,
                            color: "white",
                            boxShadow: `0 4px 10px ${ACCENT_COLOR}40`,
                        }}
                    />
                    {course?.certificate === true && (
                        <Chip
                            icon={<VerifiedUser sx={{ color: ACCENT_COLOR, fontSize: '1.2rem' }} />}
                            label="Сертифікат"
                            size="medium"
                            sx={{
                                fontWeight: 700,
                                borderRadius: "10px",
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                color: ACCENT_COLOR,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                        />
                    )}
                </Stack>


                {/* Price / Lessons (Bottom Bar) */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        // Білий/світлий оверлей для елегантності
                        background: `linear-gradient(to top, ${BACKGROUND_COLOR}99, ${BACKGROUND_COLOR}00)`,
                        borderTop: `1px solid ${BORDER_COLOR}`,
                        pt: 4,
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ fontWeight: 800, color: ACCENT_COLOR, display: 'flex', alignItems: 'center' }}>
                            <AttachMoney sx={{ fontSize: '1.5rem', mr: 0.5 }} />
                            {course?.price ? `${course.price}` : 'Безкоштовно'}
                        </Typography>

                        <Typography variant="body1" sx={{ fontWeight: 500, color: theme.palette.text.secondary, display: 'flex', alignItems: 'center' }}>
                            <MenuBook sx={{ fontSize: '1.2rem', mr: 0.8, color: ACCENT_COLOR }} />
                            {course?.lessons?.length || 0} уроків
                        </Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Контент */}
            <CardContent
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: isCard ? 3 : 5,
                    gap: 2.5,
                }}
            >
                <Stack spacing={2}>
                    {/* Заголовок */}
                    <Typography
                        variant={isCard ? "h5" : "h4"}
                        component={Link}
                        to={`/courses/${course?._id}`}
                        sx={{
                            textDecoration: "none",
                            color: theme.palette.text.primary,
                            fontWeight: 900,
                            lineHeight: 1.2,
                            fontSize: isCard ? "1.5rem" : "1.8rem",
                            transition: "color 0.3s ease",
                            "&:hover": { color: ACCENT_COLOR },
                        }}
                    >
                        {course?.title || "Професійний Курс"}
                    </Typography>

                    {/* Викладач */}
                    <Typography
                        variant="body1"
                        sx={{ color: theme.palette.text.secondary, display: 'flex', alignItems: 'center' }}
                    >
                        <School sx={{ fontSize: '1.3rem', mr: 1, color: ACCENT_COLOR }} />
                        Ментор: <b style={{ color: theme.palette.text.primary, marginLeft: '8px' }}>{course?.teacher?.name || "Провідний спеціаліст"}</b>
                    </Typography>

                    {/* Опис */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            mt: 1,
                            lineHeight: 1.6,
                            // Обмеження опису
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: isInline && !isMobile ? 3 : 2,
                        }}
                    >
                        {course?.description || "Отримайте глибокі знання та практичні навички, необхідні для успіху в сучасній цифровій індустрії. Доступ до ексклюзивних матеріалів."}
                    </Typography>
                </Stack>

                {/* Роздільник */}
                <Divider sx={{ my: 1, borderColor: BORDER_COLOR }} />

                {/* Дії */}
                {actions?.length > 0 && (
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            flexWrap: "wrap",
                            "& > *": {
                                flexGrow: 1,
                                minWidth: isCard ? '140px' : '180px'
                            }
                        }}
                    >
                        {actions.map((action, i) => (
                            // Замінюємо кнопку на більш чисту з іконкою
                            <Box key={i} sx={{
                                '& button': {
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    py: 1.2,
                                    // Стиль кнопки - чистий, акцентний
                                    background: ACCENT_COLOR,
                                    color: 'white',
                                    boxShadow: `0 4px 15px ${ACCENT_COLOR}40`,
                                    '&:hover': {
                                        background: theme.palette.primary.dark,
                                    }
                                }
                            }}>
                                {action}
                            </Box>
                        ))}
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
}

export default CourseItem;