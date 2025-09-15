import { Children, Component } from 'react'
import { roles } from '../roles'
import LessonsFormPage from '@/pages/LessonsFormPage'
export const frontRoutes = {
    pages: {
        HomePage: {
            path: '',
            meta: {
                title: 'Головна',
                isInMenu: true,
                requireAuth: false,
            },
        },
        LoginPage: {
            path: 'login',
            meta: {
                title: 'Login page',
                isInMenu: false,
                requireAuth: false,
            },
        },
        SignUpPage: {
            path: 'signup',
            meta: {
                title: 'SignUp page',
                isInMenu: false,
                requireAuth: false,
            },
        },
        UsersPage: {
            path: 'users',
            meta: {
                title: 'Users page',
                isInMenu: true,
                requireAuth: true,
                roles: [roles.admin, roles.manager],
            },
        },
        TeachersPage: {
            path: 'teachers',
            meta: {
                title: 'teachers page',
                isInMenu: true,
                requireAuth: true,
                roles: [roles.admin, roles.manager, roles.student],
            },
        },
        TeacherFormPage: {
            path: 'teachers/form/:id?',
            meta: {
                title: 'Teacher Form',
                isInMenu: false,
                requireAuth: true,
                roles: [roles.admin, roles.manager],
            },
        },
        CoursesPage: {
            path: 'courses',
            meta: {
                title: 'Courses page',
                isInMenu: true,
                requireAuth: true,
            },
            children: [
                {
                    path: ':courseId/add-lesson',
                    Component: LessonsFormPage,
                    meta: {
                        title: 'Course Form',
                        isInMenu: false,
                        requireAuth: true,
                        roles: [roles.admin, roles.manager],
                    }
                }
            ]
        },
        CourseFormPage: {
            path: 'courses/form/:id?',
            meta: {
                title: 'Course Form',
                isInMenu: false,
                requireAuth: true,
                roles: [roles.admin, roles.manager],
            },
        },
        LessonsPage: {
            path: 'lessons',
            meta: {
                title: 'Lesson Page',
                isInMenu: true,
                requireAuth: true,
                roles: [roles.admin, roles.manager],
            },
        },
        LessonsFormPage: {
            path: '/lessons/form/:id?',
            meta: {
                title: 'Lesson Form',
                isInMenu: false,
                requireAuth: true,
                roles: [roles.admin, roles.manager],
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