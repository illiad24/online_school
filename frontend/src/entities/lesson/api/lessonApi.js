import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const lessonApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getLessons: build.query({
            query: () => ({
                url: apiRoutes.lessons.list,
            }),
            providesTags: ['Lesson'],
        }),
        getLessonById: build.query({
            query: (id) => ({
                url: apiRoutes.lessons.getById(id),
            }),
            providesTags: ['Lesson'],
        }),
        createLesson: build.mutation({
            query: (lesson) => ({
                url: apiRoutes.lessons.create,
                method: 'POST',
                body: lesson,
            }),
            invalidatesTags: ['Lesson'],
        }),
        updateLesson: build.mutation({
            query: (lesson) => ({
                url: apiRoutes.lessons.update(lesson.id),
                method: 'PUT',
                body: lesson,
            }),
            invalidatesTags: ['Lesson'],
        }),
        deleteLesson: build.mutation({
            query: (id) => ({
                url: apiRoutes.lessons.delete(id),
                method: 'DELETE',
            }),
            invalidatesTags: ['Lesson'],
        }),
    }),
})

// Експортуємо всі хуки
export const {
    useGetLessonsQuery,
    useGetLessonByIdQuery,
    useCreateLessonMutation,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
} = lessonApi