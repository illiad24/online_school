import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const teacherApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // Запит для отримання всіх вчителів
        getTeacher: build.query({
            query: () => ({
                url: apiRoutes.teachers.list,
            }),
            providesTags: ['Teacher'],
        }),
        // Запит для отримання одного вчителя за ID
        getTeacherById: build.query({
            query: (teacherId) => ({
                // Використовуємо ID у URL-адресі
                url: apiRoutes.teachers.getById(teacherId),
            }),
            providesTags: ['Teacher'],
        }),
        // Мутація для додавання нового вчителя
        addTeacher: build.mutation({
            query: (newTeacher) => ({
                url: apiRoutes.teachers.create,
                method: 'POST',
                body: newTeacher,
            }),
            invalidatesTags: ['Teacher'],
        }),
        // Мутація для оновлення існуючого вчителя
        updateTeacher: build.mutation({
            query: ({ data }) => ({
                // teacherId використовується для URL, а teacherData — для тіла запиту
                url: apiRoutes.teachers.update(data._id),
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Teacher'],
        }),
        // Мутація для видалення вчителя
        deleteTeacher: build.mutation({
            query: (teacherId) => ({
                url: apiRoutes.teachers.delete(teacherId),
                method: 'DELETE',
            }),
            invalidatesTags: ['Teacher'],
        }),
    }),
})

// Експортуємо всі хуки
export const {
    useGetTeacherQuery,
    useGetTeacherByIdQuery,
    useAddTeacherMutation,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation,
} = teacherApi