import React from 'react'
import { useLogin } from '../model/useLogin'
import { useNavigate } from 'react-router'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../model/validation'
import { useForm } from 'react-hook-form'

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
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form__title">{title}</div>

            <input
                {...register('email')}
                type="text"
                placeholder="Email"
                className="form__input"
            />
            {errors.email && <div className="form__error">{errors.email.message}</div>}

            <input
                {...register('password')}
                type="password"
                placeholder="Пароль"
                className="form__input"
            />
            {errors.password && <div className="form__error">{errors.password.message}</div>}

            <button type="submit" disabled={isLoading} className="form__button">
                Увійти
            </button>

            {error?.data?.errors && (
                <div className="form__error">
                    {error.data.errors.map((e) => (
                        <div key={e.path}>{e.msg}</div>
                    ))}
                </div>
            )}
        </form>
    )
}
