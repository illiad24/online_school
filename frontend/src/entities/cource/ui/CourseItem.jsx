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
    Button, // Додаємо Button для стилізації дій, якщо actions – це просто текст
} from "@mui/material";
// Припускаємо, що Link – це компонент з 'react-router-dom' або подібної бібліотеки
import { Link } from "react-router"; // Змінено на 'react-router-dom' для коректного використання
import {
    AttachMoney,
    School,
    MenuBook,
    VerifiedUser,
    ChevronRight,
} from "@mui/icons-material";
// import LessonForm from "@/widgets/lesson/SelectLesson"; // Залишаємо

export function CourseItem({ course, actions, layout }) {
    const theme = useTheme();
    // Визначення світлих преміальних кольорів
    const ACCENT_COLOR = "#1976d2"; // Глибокий синій
    const BACKGROUND_COLOR = "#fefefe"; // Майже ідеально білий
    const BORDER_COLOR = "#e0e7f1"; // Дуже світлий сіро-синій
    const HOVER_SHADOW_COLOR = "#1976d2"; // Колір для тіні при наведенні

    const isInline = layout === "inline-view";
    const isMobile = useMediaQuery(theme.breakpoints.down(isInline ? 'sm' : 'md'));
    const isCard = !isInline || isMobile;

    // Динамічні стилі для Card (загортаємо в Link)
    const CardLink = ({ children, to, ...props }) => (
        <Card
            component={Link}
            to={to}
            sx={{
                display: "flex",
                flexDirection: isCard ? "column" : "row",
                borderRadius: "24px",
                overflow: "hidden",
                background: BACKGROUND_COLOR,
                color: theme.palette.text.primary,
                textDecoration: "none", // Важливо для Link

                // Витончена, "м'яка" тінь
                boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
                transition: "transform 0.4s cubic-bezier(.25,.8,.5,1), box-shadow 0.4s cubic-bezier(.25,.8,.5,1)",
                border: `1px solid ${BORDER_COLOR}`,

            }}
            {...props}
        >
            {children}
        </Card>
    );

    // Динамічні стилі для зображення
    const mediaBoxStyles = {
        position: "relative",
        overflow: "hidden",
        width: isInline && !isMobile ? "350px" : "100%",
        minHeight: isInline && !isMobile ? "100%" : "250px",
        flexShrink: 0,
        borderRadius: isCard ? '24px 24px 0 0' : '24px 0 0 24px',
    };

    return (
        <CardLink to={`/courses/${course?._id}`}>
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

                    }}
                />

                {/* Badge: Category & Certification (Glassmorphism Light) */}
                <Stack
                    direction="row"
                    spacing={1.5} // Трохи більше відступу
                    sx={{
                        position: "absolute",
                        top: 18,
                        left: 18,
                        zIndex: 10,
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
                                // **ПОКРАЩЕННЯ**: Додаємо легке розмиття фону для справжнього Glassmorphism
                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                                backdropFilter: "blur(5px)",
                                WebkitBackdropFilter: "blur(5px)",
                                color: ACCENT_COLOR,
                                border: `1px solid rgba(255, 255, 255, 0.4)`,
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
                        // **ПОКРАЩЕННЯ**: Градієнт та Glassmorphism для виразності
                        background: `linear-gradient(to top, ${BACKGROUND_COLOR}cc, ${BACKGROUND_COLOR}00)`,
                        backdropFilter: "blur(2px)",
                        WebkitBackdropFilter: "blur(2px)",
                        borderTop: `1px solid ${BORDER_COLOR}aa`,
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
                    {/* Заголовок (Використовуємо div, оскільки Link вже на рівні Card) */}
                    <Typography
                        variant={isCard ? "h5" : "h4"}
                        component="div" // Змінено на div
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 900,
                            lineHeight: 1.2,
                            fontSize: isCard ? "1.5rem" : "1.8rem",
                            transition: "color 0.3s ease",
                            // Додатковий ефект підсвічування тексту при наведенні на всю картку
                            [`.${CardLink.name}:hover &`]: {
                                color: ACCENT_COLOR
                            },
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
                            mt: 'auto', // Відсуває дії вниз
                            // Кнопки дій не повинні бути обгорнуті в Link, тому вони залишаються активними
                        }}
                        onClick={(e) => e.preventDefault()} // Запобігаємо переходу по основному посиланню
                    >
                        {actions.map((action, i) => (
                            <Box key={i} >
                                {action}
                            </Box>
                        ))}
                    </Stack>
                )}
            </CardContent>
        </CardLink>
    );
}

export default CourseItem;