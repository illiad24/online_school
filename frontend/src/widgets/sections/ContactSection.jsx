import { Box, Button, Typography, TextField, Container } from "@mui/material";

function ContactSection() {
    return (
        <Box
            sx={{
                textAlign: "center",
                py: { xs: "4rem", md: "6rem" }, // Зменшив py для мобільних пристроїв (xs)
                background: "linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 100%)", // Світло-синій пастельний градієнт
                position: "relative",
            }}
        >
            {/* Використовуємо Container для обмеження ширини вмісту */}
            <Container maxWidth="md">
                <Typography
                    variant="overline"
                    sx={{
                        fontWeight: 700,
                        color: "#0D47A1", // Темно-синій
                        letterSpacing: 1,
                        mb: 1,
                        display: "block",
                        fontSize: { xs: '0.7rem', sm: '0.75rem' } // Адаптивний розмір
                    }}
                >
                    Не пропусти нічого важливого
                </Typography>

                <Typography
                    variant="h4"
                    component="h2" // Для семантики
                    sx={{
                        fontWeight: 800,
                        mb: 4,
                        color: "#0D47A1",
                        fontSize: { xs: "1.75rem", sm: "2.125rem" }, // Адаптивний розмір для h4
                    }}
                >
                    Підпишись на новини школи VT
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        flexDirection: { xs: "column", sm: "row" }, // Стовпцем на мобільних, рядком на більших
                        maxWidth: 600,
                        mx: "auto",
                        px: { xs: 2, sm: 0 } // Додав горизонтальний відступ для мобільних
                    }}
                >
                    <TextField
                        placeholder="Введіть вашу електронну адресу"
                        variant="outlined"
                        fullWidth // Щоб TextField займав всю доступну ширину
                        size="medium" // Стандартний розмір
                        sx={{
                            flexGrow: 1,
                            backgroundColor: "#fff",
                            borderRadius: 1,
                            minWidth: { xs: '100%', sm: 300 }, // Мінімальна ширина для десктопу
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth={false} // На десктопі не займає всю ширину
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontWeight: 600,
                            textTransform: "none",
                            borderRadius: "8px",
                            // Фіксована ширина кнопки на мобільних
                            width: { xs: '100%', sm: 'auto' },
                            background: "linear-gradient(90deg, #1976D2 0%, #0D47A1 100%)",
                            "&:hover": {
                                background: "linear-gradient(90deg, #0D47A1 0%, #1976D2 100%)",
                            },
                        }}
                    >
                        Підписатися
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default ContactSection;