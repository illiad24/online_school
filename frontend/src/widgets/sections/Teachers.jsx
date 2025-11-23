import { useGetTeachersQuery } from "@/entities/teacher/api/teacherApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import 'swiper/css';
import "swiper/css/navigation";
import { Box, Button, Grid, Typography } from "@mui/material";
import TeacherItem from "@/entities/teacher/ui/TeacherItem";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function Teachers() {

    const { data: teachersList, isLoading } = useGetTeachersQuery()

    if (isLoading) {

        return (
            <Box>Завантаження</Box>
        )
    }
    return (
        <Box component="section" sx={{ py: 8 }}>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 4 }}
            >
                <Grid item>
                    <Typography
                        variant="subtitle1"
                        color="primary"
                        fontWeight={600}
                        sx={{ mb: 1 }}
                    >
                        НАЙКРАЩІ ВИКЛАДАЧІ ВСІ ТУТ

                    </Typography>
                    <Typography
                        variant="h2"
                        fontWeight={700}
                        sx={{
                            fontSize: { xs: "2rem", md: "2.5rem" },
                        }}
                    >
                        Зустріньте нашу команду
                    </Typography>
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            fontWeight: 600,
                            px: 3,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            color: 'primary.main'

                        }}
                    >
                        <div className="custom-prev">
                            <ArrowBackIosNewIcon sx={{ fontSize: 32, "&:hover": { color: 'primary.light' }, }} />
                        </div>

                        <div className="custom-next">
                            <ArrowForwardIosIcon sx={{ fontSize: 32, "&:hover": { color: 'primary.light' }, }} />
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <Swiper
                spaceBetween={50}
                slidesPerView={2}
                navigation={{
                    prevEl: ".custom-prev",
                    nextEl: ".custom-next",
                }}
                modules={[Navigation]}
                breakpoints={{
                    200: {   // смартфони горизонтально
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    640: {   // смартфони горизонтально
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {   // планшети
                        slidesPerView: 2,
                        spaceBetween: 30,
                    }
                }}
            >
                {teachersList.map(teacher =>

                    <SwiperSlide>
                        <TeacherItem teacher={teacher} type={2} />
                    </SwiperSlide>
                )}
            </Swiper>
        </Box>
    );
}

export default Teachers;