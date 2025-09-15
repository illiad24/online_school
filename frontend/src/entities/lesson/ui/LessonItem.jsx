import { Fragment } from "react"
import { Card, CardContent, Typography, Stack } from "@mui/material"

function LessonItem({ lesson, actions }) {
    if (!lesson) return null

    return (
        <Card sx={{ mb: 2, bgcolor: "primary.main", color: "white" }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {lesson.title}
                </Typography>

                <Typography variant="body2"><strong>ID:</strong> {lesson._id}</Typography>
                <Typography variant="body2"><strong>Content:</strong> {lesson.content}</Typography>
                <Typography variant="body2"><strong>Duration:</strong> {lesson.duration} хв</Typography>
                <Typography variant="body2">
                    <strong>Teacher:</strong> {lesson.teacher?.title || "-"}
                </Typography>
                <Typography variant="body2">
                    <strong>Created At:</strong>{" "}
                    {lesson.createdAt ? new Date(lesson.createdAt).toLocaleString("uk-UA") : "-"}
                </Typography>
                <Typography variant="body2">
                    <strong>Updated At:</strong>{" "}
                    {lesson.updatedAt ? new Date(lesson.updatedAt).toLocaleString("uk-UA") : "-"}
                </Typography>

                <Stack direction="row" spacing={2} mt={2}>
                    {actions.map((action, index) => (
                        <Fragment key={index}>{action}</Fragment>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}

export default LessonItem
