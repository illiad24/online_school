import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSignUp } from '../model/useSignUp'
export function SignUpForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signUp, isLoading, error } = useSignUp()
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        const result = await signUp({ name, email, password })
        if (result.user) navigate('/')
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

            />
            <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit" disabled={isLoading}>
                Зареєструватись
            </button>

            {error && (
                <div style={{ color: 'red' }}>
                    {error.data?.message || 'Помилка входу'}
                </div>
            )}
        </form>
    )
}