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
        changePassword: (id) => `/users/${id}/password`,
        update: (id) => `/users/${id}`,
        updateRole: (id) => `/users/${id}/role`,
        deleteByAdmin: (id) => `/users/${id}`,
        delete: (id) => `/users/${id}/user`,
        enroll: (id) => `/users/${id}/enroll`,
        getById: (id) => `/users/${id}`,
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
        addLesson: (courseId) => `/courses/${courseId}/add-lesson`,
        enroll: (id) => `/courses/${id}/enroll`
    },
    lessons: {
        list: '/lessons',
        create: '/lessons/create',
        update: (id) => `/lessons/${id}`,
        delete: (id) => `/lessons/${id}`,
        getById: (id) => `/lessons/${id}`,
    },
    // enrollments: {
    //     list: '/enrollments',
    //     create: '/enrollments/create',
    //     update: (id) => `/lessons/${id}`,
    //     delete: (id) => `/lessons/${id}`,
    //     getById: (id) => `/lessons/${id}`,
    // },
    roles: {
        list: '/roles'
    }
}