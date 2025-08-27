import React from 'react'

export function UserListItem({ user }) {
    return (
        <div>
            <strong>{user.name}</strong> — {user.email} — Роль: {user.role}
        </div>
    )
}