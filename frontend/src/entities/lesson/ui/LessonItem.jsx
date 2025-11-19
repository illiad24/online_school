import { Fragment } from "react"
import { Card, CardContent, Typography, Stack, Box, Divider, Avatar } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ArticleIcon from '@mui/icons-material/Article';

function LessonItem({ lesson, actions }) {
    if (!lesson) return null


    return (
        <Card sx={{
            mb: 3, borderRadius: 4, boxShadow: 6, background:
                "linear-gradient(135deg, #7b1fa2 0%, #512da8 100%)", color: "white", overflow: "visible"
        }}>
            {/* Header with Avatar/Icon */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, px: 3, pt: 3 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'secondary.main', boxShadow: 3, border: '3px solid white', fontWeight: 600, fontSize: 28 }}>
                    <ArticleIcon fontSize="large" />
                </Avatar>
                <Box>
                    <Typography variant="h5" fontWeight={700} gutterBottom sx={{ letterSpacing: 1, color: 'white', textShadow: '0 1px 6px #0008' }}>
                        {lesson.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#e1bee7', fontWeight: 400 }}>
                        ID: {lesson._id}
                    </Typography>
                </Box>
            </Box>

            <CardContent sx={{ pt: 2, mt: 0 }}>
                <Divider sx={{ mb: 2, bgcolor: "#fff3", height: 2, borderRadius: 1 }} />
                <Typography variant="body1" gutterBottom sx={{ color: "#ede7f6", mb: 3 }}>
                    {lesson.content}
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={4} divider={<Divider flexItem orientation="vertical" sx={{ borderColor: '#fff4' }} />}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <AccessTimeIcon sx={{ fontSize: 20, color: '#fff6' }} />
                        <Typography variant="body2" fontWeight={500} sx={{ color: 'white' }}>Тривалість: {lesson.duration} хв</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PersonIcon sx={{ fontSize: 20, color: '#fff6' }} />
                        <Typography variant="body2" fontWeight={500} sx={{ color: 'white' }}>Викладач: {lesson.teacher?.name || "-"}</Typography>
                    </Box>
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={4} mt={2} divider={<Divider flexItem orientation="vertical" sx={{ borderColor: '#fff4' }} />}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CalendarTodayIcon sx={{ fontSize: 20, color: '#fff6' }} />
                        <Typography variant="body2" fontWeight={500} sx={{ color: 'white' }}>Створено: {lesson.createdAt ? new Date(lesson.createdAt).toLocaleString("uk-UA") : "-"}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <EditCalendarIcon sx={{ fontSize: 20, color: '#fff6' }} />
                        <Typography variant="body2" fontWeight={500} sx={{ color: 'white' }}>Оновлено: {lesson.updatedAt ? new Date(lesson.updatedAt).toLocaleString("uk-UA") : "-"}</Typography>
                    </Box>
                </Stack>
                <Stack direction="row" spacing={2} mt={4}>
                    {actions.map((action, index) => (
                        <Fragment key={index}>{action}</Fragment>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}

export default LessonItem
