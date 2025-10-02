import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Stack, Box, Snackbar, Alert } from "@mui/material";
import passwordSchema from "@/shared/validationSchema/passwordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useChangePasswordMutation } from "@/entities/user/api/userApi";

function PasswordEdit() {
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(passwordSchema),
    })

    const [changePassword, { isLoading, isError, isSuccess, error }] = useChangePasswordMutation()

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [serverErrorMessage, setServerErrorMessage] = useState("")

    useEffect(() => {
        if (isSuccess) {
            setServerErrorMessage("")
            setSnackbarOpen(true)
        } else if (isError) {
            const backendMessage = error?.data?.message || "Сталася помилка при відправці"
            setServerErrorMessage(backendMessage)
        }
    }, [isSuccess, isError, error])

    const onSubmit = async (data) => {
        setServerErrorMessage("")
        try {
            await changePassword({ id, data }).unwrap()
        } catch {
            // помилку покажемо біля форми
        }
        reset({ oldPassword: "", newPassword: "" })
    }

    return (
        <Card
            variant="outlined"
            sx={{ mx: "auto", mt: 5, p: 3, borderRadius: 3, boxShadow: 3, bgcolor: "#fafafa" }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 3, textAlign: "center", color: "#333" }}
                >
                    Change Password
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="Current Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        {...register("oldPassword")}
                        error={!!errors.oldPassword}
                        helperText={errors.oldPassword?.message}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        size="medium"
                        {...register("newPassword")}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{ bgcolor: "#4caf50", "&:hover": { bgcolor: "#45a045" }, mt: 1, textTransform: "none", fontWeight: 600 }}
                    >
                        {isLoading ? "Saving..." : "Change Password"}
                    </Button>
                    {serverErrorMessage && (
                        <Alert severity="error" sx={{ mt: 1 }}>
                            {serverErrorMessage}
                        </Alert>
                    )}
                </Stack>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%', fontWeight: 500 }}>
                    Пароль успішно змінено
                </Alert>
            </Snackbar>
        </Card>
    );
}

export default PasswordEdit;
