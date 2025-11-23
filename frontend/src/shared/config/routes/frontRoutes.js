import { Children, Component } from 'react'
import { roles } from '../roles'
import LessonsFormPage from '@/pages/LessonsFormPage'
import ProfileDetails from '@/features/profile/ProfileDetails'
import ProfileCourses from '@/features/profile/ProfileCourses'

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
                title: 'Користувачі',
                isInMenu: true,
                requireAuth: true,
                roles: [roles.admin],
            },
        },

        CoursesPage: {
            path: 'courses',
            meta: {
                title: 'Курси',
                isInMenu: true,
                requireAuth: false,
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
        CourseDetails: {
            path: 'courses/:id?',
            meta: {
                title: 'Курси',
                isInMenu: false,
                requireAuth: false,
            }
        },
        TeachersPage: {
            path: 'teachers',
            meta: {
                title: 'Вчителі',
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
        CourseFormPage: {
            path: 'courses/form/:id?',
            meta: {
                title: 'Курси',
                isInMenu: false,
                requireAuth: true,
                roles: [roles.admin, roles.manager],
            },
        },
        CourseProgressPage: {
            path: 'courses/learn/:courseId',
            meta: {
                title: 'Проходження',
                isInMenu: true,
                requireAuth: true,
            },
        },
        CourseLessonsManager: {
            path: 'courses/lessons/:id',
            meta: {
                title: 'Управління уроками курсу',
                isInMenu: false,
                requireAuth: true,
                roles: [roles.admin, roles.manager],
            },
        },
        LessonsPage: {
            path: 'lessons',
            meta: {
                title: 'Уроки',
                isInMenu: true,
                requireAuth: true,
                roles: [roles.admin, roles.manager],
            },
        },
        LessonsFormPage: {
            path: '/lessons/form/:id?',
            meta: {
                title: 'Уроки',
                isInMenu: false,
                requireAuth: true,
                roles: [roles.admin, roles.manager],
            },
        },
        AboutPage: {
            path: 'about',
            meta: {
                title: 'Про нас',
                isInMenu: true,
                requireAuth: false,
            },
        },

        Profile: {
            path: '/profile/:id?',
            meta: {
                title: 'Профіль',
                isInMenu: false,
                requireAuth: true,
            },
            children: [
                {
                    index: true,
                    Component: ProfileDetails,
                    meta: {
                        title: 'Settings',
                        isInMenu: false,
                        requireAuth: true,
                    }
                },
                {
                    path: 'courses',
                    Component: ProfileCourses,
                    meta: {
                        title: 'Profile Courses',
                        isInMenu: false,
                        requireAuth: true,
                    }
                },
            ]
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