import { baseApi } from '@/shared/api/baseApi'

import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const teacherApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTeacher: build.query({
            query: () => ({
                url: apiRoutes.teachers.list,
            }),
            providesTags: ['Teacher'],
        }),
    }),
})
export const { useGetTeacherQuery } = teacherApi