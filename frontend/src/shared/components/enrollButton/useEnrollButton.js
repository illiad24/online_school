import { useAddUserToCourseMutation } from "@/entities/cource/api/courseApi";
import { useEnrollCourseMutation } from "@/entities/user/api/userApi";


export function useEnrollButton() {
    const [addUserToCourse] = useAddUserToCourseMutation()
    const [enrollCourse] = useEnrollCourseMutation()

    async function enrollClick(courseId, userId, user) {
        console.log('user');
        console.log(user);
        if (user?.courses?.some(course => course._id === courseId)) {
            return { success: false, message: "Ви вже записані на цей курс" };
        }

        try {
            await addUserToCourse({ courseId, userId }).unwrap()
            await enrollCourse({ userId, courseId }).unwrap()
        } catch (error) {
            console.log(error);
        }
    }

    return { enrollClick }
}