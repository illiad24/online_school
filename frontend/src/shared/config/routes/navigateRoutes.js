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
            getCourseById: (id) => `/courses/${id}`,
            courseLearn: (id) => `/courses/learn/${id}`,
            courseLessonManager: (id) => `/courses/lessons/${id}`,

        },
        lessons: {
            list: '/lessons',
            edit: (id) => `form/${id}`,
            create: 'form',
        },
        profile: {
            main: (id) => `/profile/${id}`,
            courses: 'courses'
        },
        about:{
            main:'/about'
        }
    }
}