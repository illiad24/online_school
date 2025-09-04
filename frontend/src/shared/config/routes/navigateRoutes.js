export const navigateRoutes = {
    navigate: {
        home: '/',
        teachers: {
            list: '/teachers',
            edit: (id) => `form/${id}`,
            create: 'form',
        },

    }
}