import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const courseApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCourses: build.query({
            query: () => ({
                url: apiRoutes.courses.list,
            }),
            providesTags: ['Course'],
        }),
    }),
})

// Експортуємо всі хуки
export const {
    useGetCoursesQuery
} = courseApi