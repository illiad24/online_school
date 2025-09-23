import { useAddUserToCourseMutation } from "@/entities/cource/api/courseApi";
import { useEnrollCourseMutation } from "@/entities/user/api/userApi";


export function useEnrollButton() {
    const [addUserToCourse] = useAddUserToCourseMutation()
    const [enrollCourse] = useEnrollCourseMutation()

    async function enrollClick(courseId, userId, user) {
        if (user?.courses?.some(course => course._id === courseId)) {
            return { success: false, message: "Ви вже записані на цей курс" };
        }

        try {
            await enrollCourse({ userId, courseId }).unwrap()
            await addUserToCourse({ courseId, userId }).unwrap()
            return { success: true, message: "Успішно записано на курс" }
        } catch (error) {
            const message = error?.data?.message || "Сталася помилка під час запису на курс"
            return { success: false, message }
        }
    }

    return { enrollClick }
}