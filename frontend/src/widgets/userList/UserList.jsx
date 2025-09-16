import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '@/entities/user/api/userApi'
import { UserListItem } from '@/entities/user/ui/UserListItem'
import ChangeRole from '@/features/user/changeRole/ui/ChangeRole'
import { useChangeRole } from '@/features/user/changeRole'
import { getRolesArray } from '@/shared/config/roles'
import { Box, Typography, CircularProgress, Stack, Alert } from '@mui/material'
import DeleteButton from '@/shared/components/deleteButton/DeleteButton'

export function UserList() {
    const user = useSelector(selectAuthUser)
    const userRole = user?.role?.title
    const isSuperAdmin = userRole === 'admin'
    const { data: usersList, isLoading, error } = useGetUsersQuery()
    const { changedRole } = useChangeRole()
    const [updateUser] = useUpdateUserMutation()
    const [deleteUser] = useDeleteUserMutation()
    const roles = getRolesArray()

    function handleDeleteUser(id) {
        console.log(id)
        deleteUser(id)
    }

    if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
    if (error) return <Alert severity="error">Помилка: {error.toString()}</Alert>

    return (

        (isSuperAdmin &&
            <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
                <Stack spacing={2}>
                    {usersList.map((userItem) => (
                        <UserListItem
                            key={userItem._id}
                            user={userItem}
                            actions={
                                user.role.title === 'admin'
                                    ? [
                                        <ChangeRole
                                            key={userItem._id}
                                            roles={roles}
                                            selectedValue={userItem.role.title}
                                            handleChange={async (e) => {
                                                await updateUser({ id: userItem._id, role: e.target.value })
                                            }}
                                        />,
                                        <DeleteButton handleSubmit={() => handleDeleteUser(userItem._id)} />
                                    ]
                                    : []
                            }
                        />
                    ))}
                </Stack>

                {changedRole.userId && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Змінив роль користувача {changedRole.userId} на {changedRole.role}
                    </Alert>
                )}
            </Box>
        )
    )
}
