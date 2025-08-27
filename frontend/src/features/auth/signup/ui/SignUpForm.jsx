import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSignUp } from '../model/useSignUp'
import { useRefreshMutation } from '../../api/authApi'
export function SignUpForm({ title }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signUp, isLoading, error } = useSignUp()
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        const result = await signUp({ name, email, password })
        const [refresh] = useRefreshMutation()
        if (result.user) {
            await refresh()
            navigate('/')
        }
    }

    return (
        <form onSubmit={onSubmit} className="form">
            <div className='form__title'>
                {title}
            </div>
            <input
                type="text"
                placeholder="Email"
                value={email}
                className="form__input"
                onChange={(e) => setEmail(e.target.value)}

            />
            <input
                type="text"
                placeholder="name"
                value={name}
                className="form__input"
                onChange={(e) => setName(e.target.value)}
                required
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
                Зареєструватись
            </button>


            {error && (
                <div className="form__error">
                    {error.data?.message || 'Помилка входу'}
                </div>
            )}
        </form>
    )
}