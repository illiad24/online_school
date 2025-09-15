import React from 'react'
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
} from '@mui/material'

function CourseForm({ onSubmit, register, errors, teachersList, lessonsList, course, error }) {
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
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

            <FormControl fullWidth variant="outlined" error={!!errors?.teacher}>
                <InputLabel id="teacher-label">Вчитель</InputLabel>
                <Select
                    labelId="teacher-label"
                    defaultValue={course?.teacher || ''}
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

            {/* Якщо потрібно підключити уроки, можна додати мультиселект через Controller */}

            {/* <FormControl fullWidth variant="outlined" error={!!errors?.lessons}>
                <InputLabel id="lessons-label">Уроки</InputLabel>
                <Select
                    labelId="lessons-label"
                    multiple
                    defaultValue={course?.lessons || []}
                    label="Уроки"
                    {...register('lessons')}
                    renderValue={(selected) =>
                        lessonsList
                            .filter((lesson) => selected.includes(lesson._id))
                            .map((lesson) => lesson.title)
                            .join(', ')
                    }
                >
                    {lessonsList?.map((lesson) => (
                        <MenuItem key={lesson._id} value={lesson._id}>
                            {lesson.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl> */}


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
