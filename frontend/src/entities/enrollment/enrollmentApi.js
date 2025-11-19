import { baseApi } from "@/shared/api/baseApi";
import { apiRoutes } from "@/shared/config/routes/apiRoutes";

export const enrollmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        enrollToCourse: build.mutation({
            query: ({ userId, courseId }) => ({
                url: apiRoutes.enrollments.create,
                method: 'POST',
                body: { userId, courseId },
            }),
            invalidatesTags: ['Enrollment'],
        }),
        getUserEnrollments: build.query({
            query: (userId) => ({
                url: apiRoutes.enrollments.list(userId),
            }),
            providesTags: ['Enrollment'],
        }),
        getEnrollmentByCourse: build.query({
            query: ({ userId, courseId }) => ({
                url: apiRoutes.enrollments.getEnroll({ userId, courseId }),
            }),
            providesTags: ['Enrollment'],
        }),
        completeLesson: build.mutation({
            query: ({ userId, courseId, lessonId }) => ({
                url: apiRoutes.enrollments.completeLesson,
                method: 'POST',
                body: { userId, courseId, lessonId },
            }),
            invalidatesTags: ['Enrollment'],
        }),
        updateEnrollmentStatus: build.mutation({
            query: ({ userId, courseId, status }) => ({
                url: apiRoutes.enrollments.updateStatus({ userId, courseId }),
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Enrollment'],
        }),
    })
})

export const {
    useEnrollToCourseMutation,
    useGetUserEnrollmentsQuery,
    useGetEnrollmentByCourseQuery,
    useCompleteLessonMutation,
    useUpdateEnrollmentStatusMutation,
} = enrollmentApi