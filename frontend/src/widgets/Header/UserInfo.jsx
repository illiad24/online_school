import { useLogout } from '@/features/auth'

import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth/api/authSlice'
export function UserInfo() {
    const user = useSelector(selectAuthUser)
    console.log(user)
    const navigate = useNavigate()

    const { logoutUser } = useLogout()



    const onLogout = () => {
        logoutUser()
        navigate('/login')
    }
    return (
        <div className="user-info">
            {!user ? (
                <>
                    <Link to="/login">Увійти</Link>
                    <Link to="/signup">Зареєструватись</Link>
                </>
            ) : (
                <>
                    <span>{user.name} ({user.role.title})</span>
                    <button onClick={onLogout}>Вийти</button>
                </>
            )}
        </div>
    )
}
