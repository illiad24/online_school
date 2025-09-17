import { useAddUserToCourseMutation } from "@/entities/cource/api/courseApi";
import { useEnrollCourseMutation } from "@/entities/user/api/userApi";


export function useEnrollButton() {
    const [addUserToCourse] = useAddUserToCourseMutation()
    const [enrollCourse] = useEnrollCourseMutation()

    async function enrollClick(courseId, userId) {
        console.log(userId)
        try {
            await addUserToCourse({ courseId, userId }).unwrap()
            await enrollCourse({ userId, courseId }).unwrap()
        } catch (error) {
            console.log(error);
        }
    }

    return { enrollClick }
}