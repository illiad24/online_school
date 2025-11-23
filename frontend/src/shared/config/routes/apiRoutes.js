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
        removeLesson: (courseId, lessonId) => `/courses/${courseId}/lesson/${lessonId}`,
        updateLessonsOrder: (courseId) => `/courses/${courseId}/lessons-order`,
    },
    lessons: {
        list: '/lessons',
        create: '/lessons/create',
        update: (id) => `/lessons/${id}`,
        delete: (id) => `/lessons/${id}`,
        getById: (id) => `/lessons/${id}`,
    },
    enrollments: {
        create: '/enrollments',
        list: (userId) => `/enrollments/user/${userId}`,
        getEnroll: ({ userId, courseId }) => `/enrollments/user/${userId}/course/${courseId}`,
        completeLesson: '/enrollments/complete-lesson',
        updateStatus: ({ userId, courseId }) => `/enrollments/${userId}/${courseId}/status`,
    },
    roles: {
        list: '/roles'
    }
}