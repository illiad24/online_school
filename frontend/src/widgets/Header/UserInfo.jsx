import { useLogout } from '@/features/auth'

import { Link, useNavigate } from 'react-router'
import { Box, Button, Typography, Link as MuiLink } from "@mui/material";
import { navigateRoutes } from '@/shared/config/routes/navigateRoutes';
import { useAuthRole } from '@/shared/hooks/useAuthRole';
import PersonIcon from '@mui/icons-material/Person';

export function UserInfo() {
    const { user } = useAuthRole();



    console.log(user);

    const navigate = useNavigate()

    const { logoutUser } = useLogout()

    // const onLogout = () => {
    //     logoutUser()
    //     navigate('/login')
    // }



    return (
        <Box className="user-info" >
            {!user ? (
                <>
                    <MuiLink component={Link} to="/login" className='button button--inherit' >
                        Увійти
                    </MuiLink>
                    <MuiLink component={Link} to="/signup" className='button ' >
                        Зареєструватись
                    </MuiLink>
                </>
            ) : (
                <>
                    <Box className='user-info__detail detail-user'>
                        <Box className='detail-user__body'>
                            <Box component={Link} to={navigateRoutes.navigate.profile.main(user.id)} className='detail-user__name'>
                                {user.name}
                            </Box>
                        </Box>
                        <Box component={Link} to={navigateRoutes.navigate.profile.main(user.id)} className='detail-user__image'>
                            {user.userImage ?
                                <Box component="img"
                                    src={user.userImage}
                                    alt='avatar'>

                                </Box>
                                : <PersonIcon />
                            }
                        </Box>
                    </Box>
                    {/* <Button
                        variant="outlined"

                        onClick={onLogout}
                        sx={{ bgcolor: 'blue' }}
                    >
                        Вийти
                    </Button> */}
                </>
            )}
        </Box>


    )
}
