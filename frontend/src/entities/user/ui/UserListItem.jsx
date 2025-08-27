import React from 'react'

export function UserListItem({ user }) {
    return (
        <div className="user-card">
            <div className="user-card__info">
                <div className="user-card__name">{user.name}</div>
                <div className="user-card__email">{user.email}</div>
                <div className="user-card__role">Роль: {user.role.title}</div>
            </div>
        </div>
    )
}