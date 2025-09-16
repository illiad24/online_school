import { Box, Grid, Typography, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Image from '@mui/icons-material/Image'; // Можеш замінити на своє зображення

function MainSection() {
    return (
        <Box component="section" className="page__main main" sx={{ py: 8 }}>
            <Box className="main__container" sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
                <Grid container alignItems="center" spacing={4} className="main__body">
                    {/* LEFT Content */}
                    <Grid item xs={12} md={6} className="main__content content-main">
                        <Box className="content-main__play play-main" display="flex" alignItems="center" mb={2}>
                            <Box className="play-main__item" sx={{ mr: 1 }}>
                                <PlayArrowIcon sx={{ fontSize: 40 }} />
                            </Box>
                            <Typography className="play-main__text" variant="subtitle1">Play showreel</Typography>
                        </Box>

                        <Typography variant="h3" className="content-main__title title title--bg" gutterBottom>
                            Enjoy studying with Createx Online Courses
                        </Typography>

                        <Box className="content-main__actions" mt={3}>
                            <Button
                                href="about.html"
                                variant="outlined"
                                color="primary"
                                sx={{ mr: 2 }}
                            >
                                About us
                            </Button>
                            <Button
                                href="courses.html"
                                variant="contained"
                                color="primary"
                            >
                                Explore courses
                            </Button>
                        </Box>
                    </Grid>

                    {/* RIGHT Image */}
                    <Grid item xs={12} md={6} className="main__image-ibg">
                        <Box component="img" src="/images/main/image.svg" alt="image" width="100%" />
                    </Grid>
                </Grid>

                {/* Bottom Stats */}
                <Grid container spacing={4} mt={6} className="main__bottom bottom-main">
                    {[
                        { value: 1200, label: 'Students graduated' },
                        { value: 84, label: 'Completed courses' },
                        { value: 16, label: 'Qualified tutors' },
                        { value: 5, label: 'Years of experience' },
                    ].map((item, index) => (
                        <Grid item xs={6} md={3} key={index} className="bottom-main__item" textAlign="center">
                            <Typography variant="h4" className="bottom-main__conter" fontWeight={600}>
                                {item.value}
                            </Typography>
                            <Typography className="bottom-main__info" color="text.secondary">
                                {item.label}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default MainSection;
