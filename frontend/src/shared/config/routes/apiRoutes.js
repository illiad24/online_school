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
    roles: {
        list: '/roles'
    }
}