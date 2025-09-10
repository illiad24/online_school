export const navigateRoutes = {
    navigate: {
        home: '/',
        teachers: {
            list: '/teachers',
            edit: (id) => `form/${id}`,
            create: 'form',
        },
        courses: {
            list: '/courses',
            edit: (id) => `form/${id}`,
            create: 'form',
            addLesson: (id) => `/courses/${id}/add-lesson`,
        },
        lessons: {
            list: '/lessons',
            edit: (id) => `form/${id}`,
            create: 'form',
        }
    }
}