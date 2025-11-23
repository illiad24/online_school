import React from 'react'
import { Card, CardContent, Typography, Box, Stack, CardMedia } from '@mui/material'
import { useAuthRole } from '@/shared/hooks/useAuthRole'

function TeacherItem({ teacher, actions, type = 1 }) {
    if (!teacher) return null

    const { isAdmin } = useAuthRole();

    return (
        type === 1 ? <Card
            sx={{
                p: { xs: 2, sm: 3 },
                mb: 3,
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(2,122,242,0.08), rgba(255,255,255,0.9))",
                boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                transition: "all 0.35s ease",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: { xs: 2, sm: 3 },
                border: "1px solid rgba(2,122,242,0.15)",
                backdropFilter: "blur(8px)",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(2,122,242,0.15)",
                    background: "linear-gradient(135deg, rgba(2,122,242,0.12), rgba(255,255,255,0.95))",
                },
            }}
        >
            <CardMedia
                component="img"
                image={teacher?.image}
                alt={teacher?.name}
                sx={{
                    width: { xs: 100, sm: 130 },
                    height: { xs: 100, sm: 130 },
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "4px solid #027af2",
                    boxShadow: "0 4px 12px rgba(2,122,242,0.3)",
                    flexShrink: 0,
                }}
            />

            <Box
                sx={{
                    flex: 1,
                    textAlign: { xs: "center", sm: "left" },
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        mb: 1,
                        color: "primary.main",
                        textShadow: "0 1px 2px rgba(2,122,242,0.15)",
                    }}
                >
                    {teacher.name}
                </Typography>

                {isAdmin && (
                    <Box sx={{ mb: 1.5 }}>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            📧 Email: <strong style={{ color: "#027af2" }}>{teacher.email}</strong>
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            🎂 Age: <strong style={{ color: "#027af2" }}>{teacher.age}</strong>
                        </Typography>
                    </Box>
                )}

                <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                    📘 <strong>Subject:</strong>{" "}
                    <span style={{ color: "#47536b", fontWeight: 600 }}>{teacher.subject}</span>
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    🧠 <strong>Experience:</strong>{" "}
                    <span style={{ color: "#47536b", fontWeight: 600 }}>
                        {teacher.experience} years
                    </span>
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        mt: 1,
                        color: "text.primary",
                        lineHeight: 1.6,
                        fontStyle: "italic",
                    }}
                >
                    “{teacher.bio}”
                </Typography>

                <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                        mt: 2.5,
                        justifyContent: { xs: "center", sm: "flex-start" },
                        flexWrap: "wrap",
                    }}
                >
                    {actions?.map((action, index) => (
                        <React.Fragment key={index}>{action}</React.Fragment>
                    ))}
                </Stack>
            </Box>
        </Card> :
            <Box>
                <Box sx={{
                    position: 'relative',
                    paddingBottom: '69%',
                    mb: '16px',
                }}>
                    <CardMedia
                        component="img"
                        image={teacher?.image}
                        alt={teacher?.name}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: "cover",
                            flexShrink: 0,
                            position: 'absolute',
                            top: 0,

                            left: 0
                        }}
                    >
                    </CardMedia>
                </Box>
                <Box
                    sx={{
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        sx={{
                            color: "text.primary",
                            lineHeight: 1.6,
                            fontSize: '32px',
                            fontWeight: '700'
                        }}
                    >
                        {teacher.name}
                    </Typography>
                    <Typography
                        sx={{
                            color: '#787a80'
                        }}
                    >
                        {teacher.subject}
                    </Typography>
                </Box>
            </Box >
    )
}

export default TeacherItem
