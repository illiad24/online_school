import React, { useRef, useState } from 'react'
import {
    Box,
    TextField,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Avatar,
} from '@mui/material'

function CourseForm({ onSubmit, register, errors, teachersList, course, error, selectedImage, setSelectedImage }) {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

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
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            encType="multipart/form-data"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 3,
                maxWidth: 600,
                mx: 'auto',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" component="h1" textAlign="center">
                Course Form
            </Typography>

            <TextField
                label="Назва"
                variant="outlined"
                fullWidth
                {...register('title')}
                error={!!errors?.title}
                helperText={errors?.title?.message}
            />

            <TextField
                label="Опис"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                {...register('description')}
                error={!!errors?.description}
                helperText={errors?.description?.message}
            />
            {/* Avatar Section */}
            <Box textAlign="center">
                <Avatar
                    src={imagePreview || course?.image || ""}
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

            <FormControl fullWidth variant="outlined" error={!!errors?.teacher}>
                <InputLabel id="teacher-label">Вчитель</InputLabel>
                <Select
                    labelId="teacher-label"
                    defaultValue={course?.teacher._id || ''}
                    label="Вчитель"
                    {...register('teacher')}
                >
                    <MenuItem value="" disabled>
                        Оберіть вчителя
                    </MenuItem>
                    {teachersList?.map((teacher) => (
                        <MenuItem key={teacher._id} value={teacher._id}>
                            {teacher.name}
                        </MenuItem>
                    ))}
                </Select>
                {errors?.teacher && (
                    <Typography variant="caption" color="error">
                        {errors.teacher.message}
                    </Typography>
                )}
            </FormControl>



            <TextField
                label="Ціна"
                variant="outlined"
                type="number"
                fullWidth
                {...register('price')}
                error={!!errors?.price}
                helperText={errors?.price?.message}
            />

            {error && (
                <Alert severity="error">
                    {error.data?.error || 'Невідома помилка'}
                </Alert>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
            </Button>
        </Box>
    )
}

export default CourseForm
