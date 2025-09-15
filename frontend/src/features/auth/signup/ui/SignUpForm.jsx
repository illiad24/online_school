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
        if (result.user) {
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
                error={!!errors.name}
                helperText={errors.name?.message}
            />

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
                {isLoading ? 'Завантаження...' : 'Зареєструватись'}
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
