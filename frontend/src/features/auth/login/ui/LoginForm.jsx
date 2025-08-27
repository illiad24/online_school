import React, { useState } from 'react'
import { useLogin } from '../model/useLogin'
import { useNavigate } from 'react-router'
export function LoginForm({ title }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()
    const navigate = useNavigate()
    const onSubmit = async (e) => {
        e.preventDefault()
        const result = await login({ email, password })
        if (result.user) navigate('/')
    }
    return (
        <form onSubmit={onSubmit} className="form">
            <div className='form__title'>
                {title}
            </div>
            <input
                type="text"
                placeholder="Email"
                className="form__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                className="form__input"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={isLoading} className="form__button">
                Увійти
            </button>

            {error && (
                <div className="form__error">
                    {error?.message || 'Помилка входу'}
                </div>
            )}
        </form>
    )
}