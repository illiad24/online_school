import React from 'react'
import { useNavigate } from 'react-router'
import { useSignUp } from '../model/useSignUp'
import { useRefreshMutation } from '../../api/authApi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../model/validation'
import { TextField, Box, Button, Typography, Alert, Stack } from '@mui/material'

export function SignUpForm({ title }) {
    const { signUp, isLoading, error } = useSignUp()

    const [refresh] = useRefreshMutation()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        const result = await signUp(data)

        if (result?.user) {
            await refresh()
            navigate('/')
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                maxWidth: 400,
                mx: 'auto',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" textAlign="center" fontWeight="bold" mb={2}>
                {title}
            </Typography>

            <TextField
                label="Ім'я"
                variant="outlined"
                fullWidth
                {...register('name')}
                error={!!errors.name || error?.data?.error?.[0]?.path == 'name'}
                helperText={errors.name?.message}
            />

            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                {...register('email')}
                error={!!errors.email || error?.data?.error?.[0]?.path == 'email'}
                helperText={errors.email?.message}
            />

            <TextField
                label="Пароль"
                type="password"
                variant="outlined"
                fullWidth
                {...register('password')}
                error={!!errors.password || error?.data?.error?.[0]?.path == 'password'}
                helperText={errors.password?.message}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
            >
                {isLoading ? 'Завантаження...' : 'Зареєструватись'}
            </Button>

            {/* Помилки з бекенду */}
            {Array.isArray(error?.data?.error) && error.data.error.length > 0 && (
                <Stack spacing={1}>
                    {error.data.error.map((e, index) => (
                        <Alert severity="error" key={index}>
                            {e.msg}
                        </Alert>
                    ))}
                </Stack>
            )}
            {!Array.isArray(error?.data?.error) && error?.data?.error && (
                <Stack spacing={1}>
                    <Alert severity="error" >
                        {error.data.error}
                    </Alert>
                </Stack>
            )}
        </Box>
    )
}
