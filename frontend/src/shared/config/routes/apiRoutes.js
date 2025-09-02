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
        update: `/teachers`,
        delete: (id) => `/teachers/${id}/delete`,
    },
    roles: {
        list: '/roles'
    }
}