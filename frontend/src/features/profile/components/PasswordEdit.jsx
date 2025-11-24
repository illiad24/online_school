import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Stack,
    Box,
    Snackbar,
    Alert,
    CircularProgress,
    useTheme
} from "@mui/material";
import passwordSchema from "@/shared/validationSchema/passwordSchema"; // Припускаємо, що це коректний шлях
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useChangePasswordMutation } from "@/entities/user/api/userApi"; // Припускаємо, що це коректний шлях

function PasswordEdit() {
    const { id } = useParams();
    const theme = useTheme();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(passwordSchema),
    });

    const [changePassword, { isLoading, isError, isSuccess, error }] = useChangePasswordMutation();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState("");

    useEffect(() => {
        if (isSuccess) {
            setServerErrorMessage("");
            setSnackbarOpen(true);
            // Скидаємо поля форми після успішної зміни
            reset({ oldPassword: "", newPassword: "" });
        } else if (isError) {
            const backendMessage = error?.data?.message || error?.error || "Сталася помилка при зміні паролю.";
            setServerErrorMessage(backendMessage);
        }
    }, [isSuccess, isError, error, reset]);

    const onSubmit = async (data) => {
        setServerErrorMessage("");
        try {
            await changePassword({ id, data }).unwrap();
        } catch {
            // Помилка обробляється в useEffect через isError
        }
        // Паролі скидаються тільки в разі успіху в useEffect
    };

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
                mt: 4,
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
                    Зміна паролю
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack spacing={3}>
                        <TextField
                            label="Поточний пароль"
                            type="password"
                            fullWidth
                            variant="outlined"
                            size="medium"
                            {...register("oldPassword")}
                            error={!!errors.oldPassword}
                            helperText={errors.oldPassword?.message}
                            disabled={isLoading}
                        />
                        <TextField
                            label="Новий пароль"
                            type="password"
                            fullWidth
                            variant="outlined"
                            size="medium"
                            {...register("newPassword")}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword?.message}
                            disabled={isLoading}
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
                            disabled={isLoading}
                            sx={{
                                mt: 3,
                                py: 1.5,
                                textTransform: "uppercase",
                                fontWeight: 700,
                                borderRadius: 1
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Зберегти новий пароль"
                            )}
                        </Button>
                    </Stack>
                </Box>
            </CardContent>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                    sx={{ width: '100%', fontWeight: 500 }}
                >
                    Пароль успішно змінено!
                </Alert>
            </Snackbar>
        </Card>
    );
}

export default PasswordEdit;
