import { useGetUserEnrollmentsQuery } from "@/entities/enrollment/enrollmentApi";

/**
 * Хук для перевірки статусу зарахування користувача на курси.
 * * @param {string | undefined} userId - ID користувача, чиї зарахування потрібно перевірити.
 * @returns {{
 * enrollments: any[] | undefined,
 * isLoading: boolean,
 * isError: boolean,
 * isUserEnrolled: (courseId: string) => boolean
 * }}
 */
export function useUserEnrollments(userId) {
    const {
        data: enrollments,
        isLoading,
        isError
    } = useGetUserEnrollmentsQuery(userId, {
        skip: !userId
    });


    function isUserEnrolled(courseId) {

        if (!enrollments) {
            return false;
        }

        return enrollments.some(en => en.course?._id === courseId);
    }

    return {
        enrollments,
        isLoading,
        isError,
        isUserEnrolled,
    };
}