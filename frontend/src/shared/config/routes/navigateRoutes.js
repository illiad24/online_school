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
        },
    }
}