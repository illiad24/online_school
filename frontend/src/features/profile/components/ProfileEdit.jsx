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
} from "@mui/material";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/entities/user/api/userApi";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getProfileSchema } from "@/shared/validationSchema/profileSchema";

function ProfileEdit() {
    const { id } = useParams();
    const { data: user, isLoading } = useGetUserByIdQuery(id);
    const [updateUser, { isLoading: updateUserLoading, isError, isSuccess, error }] = useUpdateUserMutation();

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
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
        resolver: yupResolver(getProfileSchema(user)),
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || "",
                email: user.email || "",
                number: user.number || "",
                age: user.age || "",
            });
            if (user.userImage) {
                setImagePreview(user.userImage);
            }
        }
    }, [user, reset]);

    useEffect(() => {
        if (isSuccess) {
            setServerErrorMessage("");
            setSnackbarSeverity("success");
            setSnackbarMessage("Дані успішно збережено");
            setSnackbarOpen(true);
        } else if (isError) {
            const backendMessage = error?.data?.error || error?.error || "Сталася помилка при відправці";
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
            // error
        }
    };


    if (isLoading) {
        return <p>Завантаження...</p>;
    }

    return (
        <Card
            variant="outlined"
            sx={{
                mx: "auto",
                p: 4,
                borderRadius: 3,
                boxShadow: 3,
                bgcolor: "#fafafa"
            }}
        >
            <CardContent>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 3, textAlign: "center", color: "#333" }}
                >
                    Personal Details
                </Typography>

                <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={4}
                        alignItems={{ xs: "center", sm: "flex-start" }}
                    >
                        {/* Avatar Section */}
                        <Box textAlign="center">
                            <Avatar
                                src={imagePreview || ""}
                                sx={{ width: 100, height: 100, mb: 2, boxShadow: 2 }}
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => fileInputRef.current?.click()}
                                sx={{ mt: 1, textTransform: "none", fontWeight: 500 }}
                            >
                                Upload New Picture
                            </Button>
                        </Box>

                        {/* Form Fields */}
                        <Stack spacing={2} flex={1} width="100%">
                            <TextField
                                label="Email"
                                fullWidth
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                variant="outlined"
                                size="medium"
                            />
                            <TextField
                                label="Name"
                                fullWidth
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                variant="outlined"
                                size="medium"
                            />
                            <TextField
                                label="Phone Number"
                                fullWidth
                                {...register("number")}
                                error={!!errors.number}
                                helperText={errors.number?.message}
                                variant="outlined"
                                size="medium"
                            />
                            <TextField
                                label="Age"
                                type="number"
                                fullWidth
                                {...register("age")}
                                error={!!errors.age}
                                helperText={errors.age?.message}
                                variant="outlined"
                                size="medium"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={updateUserLoading}
                                sx={{
                                    bgcolor: "#4caf50",
                                    "&:hover": { bgcolor: "#45a045" },
                                    mt: 1,
                                    textTransform: "none",
                                    fontWeight: 600
                                }}
                            >
                                {updateUserLoading ? "Saving..." : "Save Details"}
                            </Button>
                            {serverErrorMessage && (
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    {serverErrorMessage}
                                </Alert>
                            )}
                        </Stack>
                    </Stack>
                </form>

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
