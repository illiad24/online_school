import { Link, useNavigate } from 'react-router'; // Використовуємо react-router-dom
import { Box, Button, Typography, Link as MuiLink } from "@mui/material";
import { navigateRoutes } from '@/shared/config/routes/navigateRoutes';
import { useAuthRole } from '@/shared/hooks/useAuthRole';
import PersonIcon from '@mui/icons-material/Person';

// Приймаємо проп isMobile
export function UserInfo({ isMobile }) {
    const { user } = useAuthRole();

    // Стилі для кнопки реєстрації (акцентна)
    const SignUpButton = (
        <Button
            component={Link}
            to="/signup"
            variant="contained"
            size={isMobile ? 'small' : 'medium'}
            sx={{
                borderRadius: '50px',
                minWidth: isMobile ? 'auto' : '100px', // Зменшуємо ширину на мобільних
                padding: isMobile ? '4px 10px' : '6px 16px',
            }}
        >
            {isMobile ? 'Реєстр.' : 'Зареєструватись'}
        </Button>
    );

    // Стилі для кнопки входу (прозора/контурна)
    const LoginButton = (
        <Button
            component={Link}
            to="/login"
            variant="text"
            size={isMobile ? 'small' : 'medium'}
            sx={{
                color: 'primary.light',
                minWidth: isMobile ? 'auto' : '80px',
                padding: isMobile ? '4px 8px' : '6px 16px',
            }}
        >
            Увійти
        </Button>
    );


    return (
        <Box className="user-info" sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
            {!user ? (
                <>
                    {LoginButton}
                    {/* На мобільних можна сховати кнопку "Увійти" і залишити лише "Зареєструватись" для простоти, але залишимо обидві для повноти. */}
                    {SignUpButton}
                </>
            ) : (
                <>
                    <Box className='user-info__detail detail-user' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                        {/* Ім'я користувача (ховаємо на мобільних) */}
                        {!isMobile && (
                            <Box className='detail-user__body' sx={{ mr: 1 }}>
                                <MuiLink
                                    component={Link}
                                    to={navigateRoutes.navigate.profile.main(user.id)}
                                    className='detail-user__name'
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'text.primary',
                                        fontWeight: 'bold',
                                        '&:hover': { color: 'primary.main' }
                                    }}
                                >
                                    {user.name}
                                </MuiLink>
                            </Box>
                        )}

                        {/* Аватар/Іконка */}
                        <MuiLink
                            component={Link}
                            to={navigateRoutes.navigate.profile.main(user.id)}
                            className='detail-user__image'
                            sx={{
                                // Спільні стилі для аватара
                                width: isMobile ? 32 : 40,
                                height: isMobile ? 32 : 40,
                                borderRadius: '50%',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid',
                                borderColor: 'primary.light',
                                flexShrink: 0,
                            }}
                        >
                            {user.userImage ?
                                <Box
                                    component="img"
                                    src={user.userImage}
                                    alt='avatar'
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                : <PersonIcon sx={{ fontSize: isMobile ? 20 : 24, color: 'primary.light' }} />
                            }
                        </MuiLink>
                    </Box>
                </>
            )}
        </Box>
    );
}