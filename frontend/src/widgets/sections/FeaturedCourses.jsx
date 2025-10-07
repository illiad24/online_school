import { Box, Typography, Button, Grid } from "@mui/material";

export default function FeaturedCourses() {
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
                        Ready to learn?
                    </Typography>
                    <Typography
                        variant="h2"
                        fontWeight={700}
                        sx={{
                            fontSize: { xs: "2rem", md: "2.5rem" },
                        }}
                    >
                        Featured Courses
                    </Typography>
                </Grid>

                <Grid item>
                    <Button
                        variant="outlined"
                        sx={{
                            borderWidth: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                            "&:hover": { borderWidth: 2 },
                        }}
                    >
                        View all courses
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Box
                        sx={{
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            p: 3,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>
                            Item Course
                        </Typography>
                    </Box>
                </Grid>

            </Grid>
        </Box>
    );
}
