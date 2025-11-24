import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    Button,
    Stack,
    Avatar,
    TextField,
    Typography,
    Card,
    CardContent,
    Snackbar,
    Alert,
    CircularProgress,
    useTheme
} from "@mui/material";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/entities/user/api/userApi";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getProfileSchema } from "@/shared/validationSchema/profileSchema";
import { AccountCircle, PhotoCamera } from "@mui/icons-material";

function ProfileEdit() {
    const { id } = useParams();
    const theme = useTheme();

    // Запит на отримання даних користувача
    const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery(id);
    // Мутація для оновлення даних
    const [updateUser, { isLoading: isUpdating, isError, isSuccess, error }] = useUpdateUserMutation();

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    // Стан для Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [serverErrorMessage, setServerErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        // Використовуємо функцію yupResolver, припускаючи, що вона коректно працює з user
        resolver: yupResolver(getProfileSchema(user)),
    });

    // Ініціалізація форми після завантаження даних користувача
    useEffect(() => {
        if (user) {
            reset({
                name: user.name || "",
                email: user.email || "",
                number: user.number || "",
                age: user.age || "",
            });
            // Встановлення попереднього перегляду аватара
            if (user.userImage) {
                setImagePreview(user.userImage);
            }
        }
    }, [user, reset]);

    // Обробка успіху/помилки після мутації
    useEffect(() => {
        if (isSuccess) {
            setServerErrorMessage("");
            setSnackbarSeverity("success");
            setSnackbarMessage("Дані успішно оновлено!"); // Переклад
            setSnackbarOpen(true);
        } else if (isError) {
            const backendMessage = error?.data?.error || error?.error || "Не вдалося зберегти дані. Спробуйте ще раз."; // Переклад
            setServerErrorMessage(backendMessage);
        }
    }, [isSuccess, isError, error]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (values) => {
        setServerErrorMessage("");
        const data = new FormData();

        data.append("name", values.name);
        data.append("email", values.email);

        // Додаємо поля, лише якщо вони не порожні
        if (values.number !== null && values.number !== "") {
            data.append("number", values.number);
        }
        if (values.age !== null && values.age !== "") {
            data.append("age", values.age);
        }

        if (selectedImage) {
            data.append("userImage", selectedImage);
        }

        try {
            await updateUser({ id, data }).unwrap();
        } catch {
            // Помилка обробляється в useEffect через isError
        }
    };

    // ----------------------------------------------------------------
    // СТАН ЗАВАНТАЖЕННЯ (Головний запит)
    // ----------------------------------------------------------------
    if (isUserLoading || !user) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress color="primary" size={50} />
                <Typography variant="h6" sx={{ ml: 2, color: theme.palette.text.secondary }}>
                    Завантаження даних...
                </Typography>
            </Box>
        );
    }

    // ----------------------------------------------------------------
    // ОСНОВНИЙ РЕНДЕРИНГ
    // ----------------------------------------------------------------

    return (
        <Card
            variant="outlined"
            sx={{
                p: { xs: 2, sm: 4 },
                borderRadius: 2,
                boxShadow: theme.shadows[5], // Вищий рівень тіні
                maxWidth: 800, // Обмеження ширини форми
                mx: "auto",
                bgcolor: theme.palette.background.paper, // Білий фон
            }}
        >
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        mb: 4,
                        textAlign: "left",
                        color: theme.palette.primary.main,
                        borderBottom: `2px solid ${theme.palette.divider}`,
                        pb: 1
                    }}
                >
                    Особисті дані
                </Typography>

                <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 3, md: 5 }}
                        alignItems={{ xs: "stretch", md: "flex-start" }}
                    >
                        {/* 1. Секція Аватара */}
                        <Box
                            textAlign="center"
                            width={{ xs: "100%", md: 200 }}
                            flexShrink={0}
                            sx={{
                                p: 2,
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 2,
                                bgcolor: theme.palette.grey[50]
                            }}
                        >
                            <Avatar
                                src={imagePreview || ""}
                                sx={{ width: 120, height: 120, mb: 2, mx: 'auto', boxShadow: 3 }}
                            >
                                <AccountCircle sx={{ fontSize: 70 }} />
                            </Avatar>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<PhotoCamera />}
                                onClick={() => fileInputRef.current?.click()}
                                sx={{
                                    mt: 1,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    borderRadius: 1
                                }}
                                fullWidth
                            >
                                Завантажити нове фото
                            </Button>
                        </Box>

                        {/* 2. Секція Полів Форми */}
                        <Stack spacing={3} flex={1} width="100%">
                            <TextField
                                label="Електронна пошта" // Переклад
                                fullWidth
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                variant="outlined"
                                size="medium"
                                disabled={isUpdating}
                            />
                            <TextField
                                label="Ім'я" // Переклад
                                fullWidth
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                variant="outlined"
                                size="medium"
                                disabled={isUpdating}
                            />
                            <TextField
                                label="Номер телефону" // Переклад
                                fullWidth
                                {...register("number")}
                                error={!!errors.number}
                                helperText={errors.number?.message}
                                variant="outlined"
                                size="medium"
                                disabled={isUpdating}
                            />
                            <TextField
                                label="Вік" // Переклад
                                type="number"
                                fullWidth
                                {...register("age")}
                                error={!!errors.age}
                                helperText={errors.age?.message}
                                variant="outlined"
                                size="medium"
                                disabled={isUpdating}
                            />

                            {serverErrorMessage && (
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    {serverErrorMessage}
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isUpdating}
                                sx={{
                                    mt: 3,
                                    py: 1.5,
                                    textTransform: "uppercase",
                                    fontWeight: 700,
                                    borderRadius: 1
                                }}
                            >
                                {isUpdating ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "Зберегти зміни" // Переклад
                                )}
                            </Button>

                        </Stack>
                    </Stack>
                </form>

                {/* Snackbar для сповіщень */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        onClose={() => setSnackbarOpen(false)}
                        severity={snackbarSeverity}
                        sx={{ width: '100%', fontWeight: 500 }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </CardContent>
        </Card>
    );
}

export default ProfileEdit;