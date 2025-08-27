import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth/api/authSlice'
import { Link, NavLink } from 'react-router'
import { getPagesObjectList } from '@/shared/config/routes/frontRoutes'

export function MainMenu() {
    const user = useSelector(selectAuthUser)

    // Фільтруємо маршрути, які потрібно показати в меню (ті, що мають title)
    // І враховуємо requireAuth і ролі

    const allowedRoutes = getPagesObjectList().filter(({ meta }) => {
        if (!meta.isInMenu) return false
        if (!meta.requireAuth) return true
        if (!user) return false
        if (!meta.roles) return true
        return meta?.roles.includes(user?.role.title)
    })

    return (
        <div className='header__menu menu'>
            <nav className='menu__nav'>
                <ul className='menu__list'>
                    <li className='menu__item'>
                        {allowedRoutes.map(({ path, meta }) => (
                            <NavLink className='menu__link' key={path} to={path} style={{ margin: '0 10px' }}>
                                {meta.title}
                            </NavLink>
                        ))}
                    </li>
                </ul>
            </nav>
        </div>
    )
}
