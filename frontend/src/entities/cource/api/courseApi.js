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
            query: (formData) => ({
                url: apiRoutes.courses.create,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Course'],
        }),
        updateCourse: build.mutation({
            query: ({ id, formData }) => ({
                url: apiRoutes.courses.update(id),
                method: 'PUT',
                body: formData,
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
        addUserToCourse: build.mutation({
            query: ({ courseId, userId }) => ({
                url: apiRoutes.courses.enroll(courseId),
                method: 'POST',
                body: { courseId, userId },
            }),
            invalidatesTags: ['Course', 'User']
        }),
    }),
})

export const {
    useGetCoursesQuery,
    useGetCourseByIdQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useAddLessonToCourseMutation,
    useAddUserToCourseMutation
} = courseApi