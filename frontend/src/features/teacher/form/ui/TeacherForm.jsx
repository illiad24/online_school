import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, Alert, Stack } from '@mui/material'

function TeacherForm({ onSubmit, register, errors, coursesList, teacher, error }) {
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

            <TextField
                label="Age"
                type="number"
                variant="outlined"
                fullWidth
                {...register('age')}
                error={!!errors?.age}
                helperText={errors?.age?.message}
            />

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
