import { useDeleteTeacherMutation } from "@/entities/teacher/api/teacherApi";

export function useDeleteTeacherButton() {
    const [deleteTeacher] = useDeleteTeacherMutation();
    const handleDelete = (teacherId) => {
        deleteTeacher(teacherId);
    };

    return { handleDelete };
}
