import { useState } from 'react'


import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'
import { useGetUsersQuery } from '@/entities/user/api/userApi'
import { UserListItem } from '@/entities/user/ui/UserListItem'
export function UserList() {
    const user = useSelector(selectAuthUser)
    console.log(user)
    const { data: usersList, isLoading, error } = useGetUsersQuery()
    console.log(usersList)
    if (isLoading) return <div>Завантаження оголошень...</div>
    if (error) return <div>Помилка: {error.toString()}</div>
    return (
        <div>
            {usersList.map(user =>
                <UserListItem user={user} />
            )}
        </div>
    )
} 