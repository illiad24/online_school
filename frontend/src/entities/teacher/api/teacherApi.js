import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const teacherApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTeachers: build.query({
            query: () => ({
                url: apiRoutes.teachers.list,
            }),
            providesTags: ['Teacher'],
        }),
        getTeacherById: build.query({
            query: (teacherId) => ({
                url: apiRoutes.teachers.getById(teacherId),
            }),
            providesTags: ['Teacher'],
        }),
        addTeacher: build.mutation({
            query: (newTeacher) => ({
                url: apiRoutes.teachers.create,
                method: 'POST',
                body: newTeacher,
            }),
            invalidatesTags: ['Teacher'],
        }),
        updateTeacher: build.mutation({
            query: ({ data }) => ({
                url: apiRoutes.teachers.update(data._id),
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Teacher'],
        }),
        deleteTeacher: build.mutation({
            query: (teacherId) => ({
                url: apiRoutes.teachers.delete(teacherId),
                method: 'DELETE',
            }),
            invalidatesTags: ['Teacher'],
        }),
    }),
})

export const {
    useGetTeachersQuery,
    useGetTeacherByIdQuery,
    useAddTeacherMutation,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation,
} = teacherApi