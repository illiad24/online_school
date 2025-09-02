import { useGetTeacherQuery } from "@/entities/teacher/api/teacherApi";
import TeacherItem from "@/entities/teacher/ui/TeacherItem";

function TeacherList() {
    const { data: teachers, isLoading, error } = useGetTeacherQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading teachers</div>;
    }

    return (
        <div>
            <h1>Список вчителів</h1>
            {teachers.map(teacher => (
                <TeacherItem key={teacher.id} teacher={teacher} />
            ))}
        </div>
    );
}

export default TeacherList;