import { useLogout } from '@/features/auth'

import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth/api/authSlice'
import { Box, Button, Typography, Link as MuiLink } from "@mui/material";
export function UserInfo() {
    const user = useSelector(selectAuthUser)
    const navigate = useNavigate()

    const { logoutUser } = useLogout()

    const onLogout = () => {
        logoutUser()
        navigate('/login')
    }
    const userInfoStyles = {
        root: {
            display: "flex",
            alignItems: "center",
            gap: 2,
        },
        link: {
            color: "#fff",
            fontWeight: 500,
            transition: "0.2s",
            "&:hover": {
                color: "secondary.white",
                textDecoration: "underline",
            },
        },
        userName: {
            color: "common.white",
            fontWeight: 500,
        },
        button: {
            textTransform: "none",
            borderRadius: 2,
            px: 2,
            borderColor: "common.white",
            color: "common.white",
            "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                borderColor: "secondary.light",
            },
        },
    }


    return (
        <Box className="user-info" sx={userInfoStyles.root}>
            {!user ? (
                <>
                    <MuiLink component={Link} to="/login" sx={userInfoStyles.link}>
                        Увійти
                    </MuiLink>
                    <MuiLink component={Link} to="/signup" sx={userInfoStyles.link}>
                        Зареєструватись
                    </MuiLink>
                </>
            ) : (
                <>
                    <Typography variant="body1" sx={userInfoStyles.userName}>
                        {user.name} ({user.role.title})
                    </Typography>
                    <Button
                        variant="outlined"

                        onClick={onLogout}
                        sx={{ bgcolor: 'blue' }}
                    >
                        Вийти
                    </Button>
                </>
            )}
        </Box>


    )
}
