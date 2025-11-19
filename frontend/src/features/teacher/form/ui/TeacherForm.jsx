import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, Alert, Stack, Avatar } from '@mui/material'
import { useRef, useState } from 'react';

function TeacherForm({ onSubmit, register, errors, coursesList, teacher, error, selectedImage, setSelectedImage }) {

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
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 600,
                mx: 'auto',
            }}
        >
            <Typography variant="h5" component="h1" textAlign="center" mb={2}>
                Teacher Form
            </Typography>

            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                {...register('name')}
                error={!!errors?.name}
                helperText={errors?.name?.message}
            />

            <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                {...register('email')}
                error={!!errors?.email}
                helperText={errors?.email?.message}
            />

            <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                {...register('subject')}
                error={!!errors?.subject}
                helperText={errors?.subject?.message}
            />

            <TextField
                label="Bio"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                {...register('bio')}
                error={!!errors?.bio}
                helperText={errors?.bio?.message}
            />

            <TextField
                label="Experience (years)"
                type="number"
                variant="outlined"
                fullWidth
                {...register('experience')}
                error={!!errors?.experience}
                helperText={errors?.experience?.message}
            />
            {/* Avatar Section */}
            <Box textAlign="center">
                <Avatar
                    src={imagePreview || teacher?.image || ""}
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

            <TextField
                label="Age"
                type="number"
                variant="outlined"
                fullWidth
                {...register('age')}
                error={!!errors?.age}
                helperText={errors?.age?.message}
            />
            {coursesList.length > 0 &&
                <FormControl fullWidth variant="outlined" error={!!errors?.courses}>
                    <InputLabel id="courses-label">Courses</InputLabel>
                    <Select
                        labelId="courses-label"
                        multiple
                        defaultValue={teacher?.courses || []}
                        label="Courses"
                        {...register('courses')}
                        renderValue={(selected) =>
                            coursesList
                                .filter((course) => selected.includes(course._id))
                                .map((course) => course.title)
                                .join(', ')
                        }
                    >
                        {coursesList?.map((course) => (
                            <MenuItem key={course._id} value={course._id}>
                                {course.title}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors?.courses && (
                        <Typography variant="caption" color="error">
                            {errors.courses.message}
                        </Typography>
                    )}
                </FormControl>
            }

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

export default TeacherForm
