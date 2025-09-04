import { Children, Component } from 'react'
import { roles } from '../roles'
import TeacherFormPage from '@/pages/TeacherFormPage'
export const frontRoutes = {
    pages: {
        HomePage: {
            path: '',
            navigationPath: '/',

            meta: {
                title: 'Головна',
                isInMenu: true,
                requireAuth: false,
            },
        },
        LoginPage: {
            path: 'login',

            navigationPath: '/login',

            meta: {
                title: 'Login page',
                isInMenu: false,
                requireAuth: false,
            },
        },
        SignUpPage: {
            path: 'signup',
            navigationPath: '/signup',
            meta: {
                title: 'SignUp page',
                isInMenu: false,
                requireAuth: false,
            },
        },
        UsersPage: {
            path: 'users',
            navigationPath: '/users',
            meta: {
                title: 'Users page',
                isInMenu: true,
                requireAuth: true,
                roles: [roles.admin],
            },
        },
        TeachersPage: {
            path: 'teachers',
            navigationPath: '/teachers',
            meta: {
                title: 'teachers page',
                isInMenu: true,
                requireAuth: true,
                roles: [roles.admin, roles.manager, roles.user],
            },
        },
        TeacherFormPage: {
            path: 'teachers/form/:id?',
            navigationPath: '/teachers/form/',
            meta: {
                title: 'Teacher Form',
                isInMenu: false,
                requireAuth: true,
                roles: [roles.admin, roles.manager],
            },
        },
        CoursesPage: {
            path: 'courses',
            navigationPath: '/courses',
            meta: {
                title: 'Courses page',
                isInMenu: true,
                requireAuth: true,
                roles: [roles.admin],
            },
        },
        NotFoundPage: {
            path: '*',
            meta: {
                title: 'Not Found',
                isInMenu: false,
                requireAuth: false,
            },
        },
        ForbiddenPage: {
            path: 'forbidden',
            navigationPath: '/forbidden',
            meta: {
                title: 'Forbidden',
                isInMenu: false,
                requireAuth: false,
            },
        },
    },
}
export function getPagesObjectList() {
    const pagesList = Object.keys(frontRoutes.pages)
    return pagesList.map((page) => frontRoutes.pages[page])
}