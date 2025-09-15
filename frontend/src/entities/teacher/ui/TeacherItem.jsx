import React from 'react'
import { Card, CardContent, Typography, Box, Stack } from '@mui/material'

function TeacherItem({ teacher, actions }) {
    if (!teacher) return null

    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', p: 2, mb: 2, boxShadow: 3 }}>
            <CardContent sx={{ flex: '1 1 auto' }}>
                <Typography variant="h6">{teacher.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Email: {teacher.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Subject: {teacher.subject}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Experience: {teacher.experience} years
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Age: {teacher.age}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    {teacher.bio}
                </Typography>
            </CardContent>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Stack direction="row" spacing={1}>
                    {actions.map((action, index) => (
                        <React.Fragment key={index}>{action}</React.Fragment>
                    ))}
                </Stack>
            </Box>
        </Card>
    )
}

export default TeacherItem
