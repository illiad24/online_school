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
        getCourseById: build.query({
            query: (id) => ({
                url: apiRoutes.courses.getById(id),
            }),
            providesTags: ['Course'],
        }),
        createCourse: build.mutation({
            query: (course) => ({
                url: apiRoutes.courses.create,
                method: 'POST',
                body: course,
            }),
            invalidatesTags: ['Course'],
        }),
        updateCourse: build.mutation({
            query: (course) => ({
                url: apiRoutes.courses.update(course.id),
                method: 'PUT',
                body: course,
            }),
            invalidatesTags: ['Course'],
        }),
        deleteCourse: build.mutation({
            query: (id) => ({
                url: apiRoutes.courses.delete(id),
                method: 'DELETE',
            }),
            invalidatesTags: ['Course'],
        }),
        addLessonToCourse: build.mutation({
            query: ({ courseId, lessonId }) => ({
                url: apiRoutes.courses.addLesson(courseId),
                method: 'POST',
                body: { lessonId },
            }),
            invalidatesTags: ['Course'],
        }),
    }),
})

// Експортуємо всі хуки
export const {
    useGetCoursesQuery,
    useGetCourseByIdQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useAddLessonToCourseMutation
} = courseApi