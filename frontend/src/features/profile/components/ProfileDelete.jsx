import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDeleteUserMutation } from "@/entities/user/api/userApi";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    Box,
    Card,
    CardContent,
    useTheme,
    CircularProgress,
    Alert
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

/**
 * Компонент для видалення профілю. 
 * Розміщується як окрема "Небезпечна зона" на сторінці налаштувань.
 * * @param {object} props
 * @param {string} props.userEmail - Електронна пошта поточного користувача для підтвердження.
 * @returns {JSX.Element}
 */
function ProfileDelete({ userEmail }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    // Отримуємо функцію мутації та стани завантаження/помилки
    const [deleteUser, {
        isLoading: isDeleting,
        error: deleteApiError
    }] = useDeleteUserMutation();

    const [open, setOpen] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [localError, setLocalError] = useState("");

    const handleOpen = () => {
        setOpen(true);
        // Скидаємо помилки API та локальні помилки при відкритті
        setLocalError("");
    };

    const handleClose = () => {
        setOpen(false);
        setEmailInput("");
        setLocalError("");
    }

    const handleDelete = async () => {
        setLocalError(""); // Скидаємо попередні помилки

        if (emailInput.toLowerCase() !== userEmail.toLowerCase()) {
            setLocalError("Введена пошта не відповідає вашій обліковій пошті.");
            return;
        }

        try {
            // Виконуємо мутацію
            await deleteUser(id).unwrap();

            // Якщо успішно, закриваємо діалог і перенаправляємо
            handleClose();
            navigate("/");
            // Після видалення та перенаправлення може знадобитися повне оновлення сторінки 
            // для скидання глобального стану аутентифікації.
            window.location.reload();
        } catch (err) {
            // Обробка помилок API
            const errorMessage = err?.data?.message || err?.error || "Сталася невідома помилка при видаленні.";
            setLocalError(errorMessage);
        }
    }

    // Відображення помилки API, якщо вона є
    const apiErrorMessage = deleteApiError?.data?.message || deleteApiError?.error;
    const currentError = localError || apiErrorMessage;

    return (
        <Card
            variant="outlined"
            sx={{
                mt: 4,
                p: { xs: 2, sm: 4 },
                borderRadius: 2,
                boxShadow: theme.shadows[1],
                borderColor: theme.palette.error.main,
                borderWidth: 2,
                borderStyle: 'solid',
                bgcolor: theme.palette.error.lighter || theme.palette.error.A100 // Світло-червоний фон для акценту
            }}
        >
            <CardContent sx={{ p: 0 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.error.dark,
                        mb: 1
                    }}
                >
                    Небезпечна зона
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Видалення вашого акаунту є незворотнім. Усі ваші дані, історія та налаштування будуть втрачені назавжди.
                </Typography>

                <Button
                    variant="contained"
                    color="error"
                    onClick={handleOpen}
                    startIcon={<DeleteForever />}
                    sx={{
                        fontWeight: 600,
                        py: 1.2,
                        borderRadius: 1
                    }}
                >
                    Видалити акаунт
                </Button>
            </CardContent>

            {/* Діалог Підтвердження */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ color: theme.palette.error.main, fontWeight: 700 }}>
                    Підтвердження видалення акаунту
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ mb: 2, color: theme.palette.text.primary }}>
                        Ви точно хочете видалити акаунт? Ця дія є незворотною.
                        Будь ласка, введіть свою електронну пошту (
                        <Box component="span" sx={{ fontWeight: 600 }}>{userEmail}</Box>
                        ) для підтвердження:
                    </Typography>

                    {/* Поле введення пошти */}
                    <TextField
                        label="Введіть пошту"
                        fullWidth
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        error={!!currentError}
                        helperText={currentError}
                        variant="outlined"
                        autoFocus
                    />

                    {/* Додаткове попередження про незворотність */}
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        Всі ваші дані будуть видалені без можливості відновлення.
                    </Alert>

                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleClose} disabled={isDeleting} sx={{ fontWeight: 600 }}>
                        Відмінити
                    </Button>
                    <Button
                        color="error"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        variant="contained"
                        sx={{ fontWeight: 600 }}
                    >
                        {isDeleting ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Видалити назавжди"
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default ProfileDelete;