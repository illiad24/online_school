export const apiRoutes = {
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        refresh: '/auth/refresh',
        profile: '/auth/profile',
        signup: '/auth/signup',
    },
    users: {
        list: '/users',
        create: '/users/create',
        update: `/users`,
        delete: (id) => `/users/${id}/delete`,
    },
    teachers: {
        list: '/teachers',
        create: '/teachers/create',
        update: (id) => `/teachers/${id}`,
        delete: (id) => `/teachers/${id}`,
        getById: (id) => `/teachers/${id}`,
    },
    courses: {
        list: '/courses',
        create: '/courses/create',
        update: (id) => `/courses/${id}`,
        delete: (id) => `/courses/${id}`,
        getById: (id) => `/courses/${id}`,
    },
    roles: {
        list: '/roles'
    }
}