import { Fragment, useState } from 'react'


import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'
import { useGetUsersQuery, useUpdateUserMutation } from '@/entities/user/api/userApi'
import { UserListItem } from '@/entities/user/ui/UserListItem'
import { useChangeRole } from '@/features/user/changeRole'
import ChangeRole from '@/features/user/changeRole/ui/ChangeRole'
import { getRolesArray } from '@/shared/config/roles'
export function UserList() {
    const user = useSelector(selectAuthUser)
    const { data: usersList, isLoading, error } = useGetUsersQuery()
    const { changedRole, handleChange } = useChangeRole();
    const [updateUser] = useUpdateUserMutation()
    const roles = getRolesArray()

    console.log(user.role.title)
    if (isLoading) return <div>Завантаження оголошень...</div>
    if (error) return <div>Помилка: {error.toString()}</div>
    return (
        <div>
            {
                user.role.title === 'admin'
                    ? usersList.map((user, index) => (
                        <Fragment key={index}>
                            <UserListItem
                                user={user}
                                actions={[
                                    <ChangeRole
                                        roles={roles}
                                        selectedValue={user.role.title}
                                        handleChange={async (e) => {
                                            await updateUser({ id: user._id, role: e.target.value })
                                        }}
                                    />
                                ]}
                            />
                        </Fragment>
                    ))
                    : usersList.map((user, index) => (
                        <Fragment key={index}>
                            <UserListItem user={user} actions={[]} />
                        </Fragment>
                    ))
            }
            <div>
                {changedRole.userId && (
                    <p>
                        Змінив роль користувача {changedRole.userId} на {changedRole.role}
                    </p>
                )}
            </div>
        </div>
    )
} 