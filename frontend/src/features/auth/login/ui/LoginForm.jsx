import React from 'react'
import { useLogin } from '../model/useLogin'
import { useNavigate } from 'react-router'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../model/validation'
import { useForm } from 'react-hook-form'

import { TextField, Box, Button, Typography, Alert, Stack } from '@mui/material'

export function LoginForm({ title }) {
    const { login, isLoading, error } = useLogin()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        const result = await login({ email: data.email, password: data.password })
        if (result.user) navigate('/')
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                maxWidth: '400px',
                width: '100%',
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
                label="Email"
                variant="outlined"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <TextField
                label="Пароль"
                type="password"
                variant="outlined"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
            >
                {isLoading ? 'Завантаження...' : 'Увійти'}
            </Button>

            {/* Помилки з бекенду */}
            {error?.data?.errors?.length > 0 && (
                <Stack spacing={1}>
                    {error.data.errors.map((e, index) => (
                        <Alert severity="error" key={index}>
                            {e.msg}
                        </Alert>
                    ))}
                </Stack>
            )}

            {error?.data?.error && (
                <Alert severity="error">{error.data.error}</Alert>
            )}
        </Box>
    )
}
