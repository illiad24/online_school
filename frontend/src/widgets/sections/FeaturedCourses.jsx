import React from "react";
import { useGetCoursesQuery } from "@/entities/cource/api/courseApi";
import CourseItem from "@/entities/cource/ui/CourseItem";
import {
    Box,
    Typography,
    Button,
    Grid,
    Container,
    CircularProgress,
    useTheme,
    useMediaQuery
} from "@mui/material";
import { ChevronRight, ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

// --- Виправлені та консолідовані імпорти Swiper ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/navigation";
import { useAuthRole } from "@/shared/hooks/useAuthRole";
import { useUserEnrollments } from "@/shared/hooks/useEnrollemntCheck";
import SimpleButton from "@/shared/components/simpleButton/SimpleButton";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
// ----------------------------------------------------

export default function FeaturedCourses() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const ACCENT_COLOR = theme.palette.primary.main || "#0077b6";
    const TEXT_PRIMARY = theme.palette.text.primary || "#2c3e50";

    const { user, isAdmin, isSuperAdmin, isStudent } = useAuthRole()

    const { isUserEnrolled } = useUserEnrollments()
    const { data, isLoading, isError } = useGetCoursesQuery();

    // ----------------------------------------------------
    // ОБРОБКА СТАНІВ
    // ----------------------------------------------------

    if (isLoading) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                <CircularProgress sx={{ color: ACCENT_COLOR }} />
                <Typography variant="h6" sx={{ mt: 2 }}>Завантаження популярних курсів...</Typography>
            </Container>
        );
    }

    if (isError) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5" color="error">
                    Помилка завантаження курсів. Спробуйте пізніше.
                </Typography>
            </Container>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">
                    На жаль, наразі немає рекомендованих курсів.
                </Typography>
            </Container>
        );
    }

    // ----------------------------------------------------
    // ОСНОВНЕ ВІДОБРАЖЕННЯ
    // ----------------------------------------------------

    return (
        <Box component="section" sx={{ py: 8, background: '#ffffff' }}>
            {/* Блок Заголовка та Кнопки */}
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 6 }}
            >
                <Grid item xs={12} sm={8}>
                    <Typography
                        variant="subtitle1"
                        sx={{ mb: 1, fontWeight: 700, color: ACCENT_COLOR, textTransform: 'uppercase', letterSpacing: 1 }}
                    >
                        Ready to learn?
                    </Typography>
                    <Typography
                        variant={isMobile ? "h4" : "h3"}
                        fontWeight={800}
                        sx={{ color: TEXT_PRIMARY }}
                    >
                        Featured Courses
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'left', sm: 'right' }, mt: { xs: 2, sm: 0 } }}>
                    <Button
                        variant="outlined"
                        endIcon={<ChevronRight />}
                        sx={{
                            borderWidth: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                            borderRadius: '10px',
                            borderColor: ACCENT_COLOR,
                            color: ACCENT_COLOR,
                            "&:hover": { borderWidth: 2, background: ACCENT_COLOR + '05' },
                        }}
                    >
                        View all courses
                    </Button>
                </Grid>
            </Grid>

            {/* Блок Swiper Carousel */}
            <Box sx={{ position: 'relative', }}>
                <Swiper
                    // --- Вмикаємо модуль навігації ---
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    // -----------------------------------
                    spaceBetween={24}
                    slidesPerView={1}

                    breakpoints={{
                        640: { // Змінюємо слайди для мобільних/планшетів
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                        1024: { // Десктоп
                            slidesPerView: 3,
                            spaceBetween: 30,
                        }
                    }}
                >
                    {/* --- ВИПРАВЛЕНО: Додано key та неявний return --- */}
                    {data.map(course => (
                        <SwiperSlide key={course._id}>
                            <CourseItem course={course} type={2}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Кастомні кнопки навігації Material UI */}
                <Box
                    className="swiper-button-prev-custom"
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        cursor: 'pointer',
                        color: ACCENT_COLOR,
                        p: 1,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: `1px solid ${ACCENT_COLOR}30`,
                        transition: '0.2s',
                        '&:hover': { backgroundColor: ACCENT_COLOR + '10' }
                    }}
                >
                    <ArrowBackIosNew fontSize="small" sx={{ ml: 0.5 }} />
                </Box>
                <Box
                    className="swiper-button-next-custom"
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        cursor: 'pointer',
                        color: ACCENT_COLOR,
                        p: 1,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: `1px solid ${ACCENT_COLOR}30`,
                        transition: '0.2s',
                        '&:hover': { backgroundColor: ACCENT_COLOR + '10' }
                    }}
                >
                    <ArrowForwardIos fontSize="small" sx={{ mr: 0.5 }} />
                </Box>
            </Box>
        </Box>
    );
}