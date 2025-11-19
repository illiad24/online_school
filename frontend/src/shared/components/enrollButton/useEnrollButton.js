import { useEnrollToCourseMutation } from "@/entities/enrollment/enrollmentApi";

export function useEnrollButton() {
    const [enrollToCourse] = useEnrollToCourseMutation()
    async function enrollClick(userId, courseId) {

        try {
            await enrollToCourse({ userId, courseId })
            return { success: true, message: "Успішно записано на курс" }
        } catch (error) {
            console.log(error);
        }
    }

    return { enrollClick }
}