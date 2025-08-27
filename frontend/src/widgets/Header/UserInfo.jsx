import { useLogout } from '@/features/auth'

import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth/api/authSlice'
export function UserInfo() {
    const user = useSelector(selectAuthUser)
    console.log(user)
    const navigate = useNavigate()

    const { logoutUser } = useLogout()

    if (!user) {
        return (
            <div>
                <Link
                    to={'/login'}
                    style={{ marginLeft: 20 }}
                >
                    Увійти
                </Link>
                <Link
                    to={'/signup'}
                    style={{ marginLeft: 20 }}
                >
                    Зареєструватись
                </Link>
            </div>
        )
    }

    const onLogout = () => {
        logoutUser()
        navigate('/login')
    }
    return (
        <div style={{ marginLeft: 20, color: 'gray' }}>
            <span>
                {user.name} ({user.role.title})
            </span>
            <button onClick={onLogout} style={{ marginLeft: 10 }}>
                Вийти
            </button>
        </div>
    )
}
