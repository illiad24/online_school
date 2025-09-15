import React from 'react'
import { Card, CardContent, Typography, Box, Stack } from '@mui/material'

export function UserListItem({ user, actions }) {
    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 2 }}>
            <CardContent sx={{ flex: '1 1 auto' }}>
                <Typography variant="h6" component="div">
                    {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Роль: {user.role.title}
                </Typography>
            </CardContent>

            <Box sx={{ display: 'flex', gap: 1 }}>
                {actions.map((action, index) => (
                    <React.Fragment key={index}>{action}</React.Fragment>
                ))}
            </Box>
        </Card>
    )
}
