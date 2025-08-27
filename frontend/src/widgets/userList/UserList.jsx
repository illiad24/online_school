import { useState } from 'react'


import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'
export function UserList() {
    const user = useSelector(selectAuthUser)


    return (
        <div>


        </div>
    )
}