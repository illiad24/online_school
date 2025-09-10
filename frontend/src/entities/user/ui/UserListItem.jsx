import React, { Fragment } from 'react'

export function UserListItem({ user, actions }) {
    return (
        <div className="user-card">
            <div className="user-card__info">
                <div className="user-card__name">{user.name}</div>
                <div className="user-card__email">{user.email}</div>
                <div className="user-card__role">Роль:  {user.role.title}</div>
            </div>
            <div>
                {actions.map((action, index) =>
                    <Fragment key={index}>
                        {action}
                    </Fragment>
                )}
            </div>
        </div>
    )
}