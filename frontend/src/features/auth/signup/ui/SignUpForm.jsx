import React from 'react';
import { useNavigate } from 'react-router';
import { useSignUp } from '../model/useSignUp';
import { useRefreshMutation } from '../../api/authApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../model/validation';

export function SignUpForm({ title }) {
    const { signUp, isLoading, error } = useSignUp();
    const [refresh] = useRefreshMutation();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const result = await signUp(data);
        if (result.user) {
            await refresh();
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form__title">{title}</div>

            <input
                {...register('name')}
                type="text"
                placeholder="Ім'я"
                className="form__input"
            />
            {errors.name && <div className="form__error">{errors.name.message}</div>}

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
                Зареєструватись
            </button>

            {/* Помилки з бекенду */}
            {error?.data?.errors && (
                <div className="form__error">
                    {error.data.errors.map((e, index) => (
                        <div key={index}>{index + 1} - {e.msg}</div>
                    ))}
                </div>
            )}
        </form>
    );
}
