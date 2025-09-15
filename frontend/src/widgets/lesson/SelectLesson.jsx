import { useState } from "react"
import { useAddLessonToCourseMutation } from "@/entities/cource/api/courseApi"
import { useGetLessonsQuery } from "@/entities/lesson/api/lessonApi"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, CircularProgress, Typography } from "@mui/material"

function SelectLesson({ courseId }) {
    const { data: lessonsList, isLoading, isError } = useGetLessonsQuery()
    const [selectedLesson, setSelectedLesson] = useState("")
    const [addLessonToCourse, { isLoading: isSubmitting }] = useAddLessonToCourseMutation()

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (isError) {
        return (
            <Typography color="error" sx={{ mt: 2 }}>
                Помилка завантаження уроків
            </Typography>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedLesson) {
            alert("Будь ласка, оберіть урок!")
            return
        }

        try {
            await addLessonToCourse({ courseId, lessonId: selectedLesson }).unwrap()
            setSelectedLesson("")
        } catch (error) {
            alert("Сталася помилка ❌")
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel id={`select-lesson-label-${courseId}`}>Оберіть урок</InputLabel>
                <Select
                    labelId={`select-lesson-label-${courseId}`}
                    value={selectedLesson}
                    label="Оберіть урок"
                    onChange={(e) => setSelectedLesson(e.target.value)}
                >
                    {lessonsList.map((lesson) => (
                        <MenuItem key={lesson._id} value={lesson._id}>
                            {lesson.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? "Додаємо..." : "Додати урок"}
            </Button>
        </Box>
    )
}

export default SelectLesson
