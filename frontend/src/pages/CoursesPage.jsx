import { useGetLessonsQuery } from "@/entities/lesson/api/lessonApi";
import CourseList from "@/widgets/course/CourseList";
function CoursesPage() {
    return (
        <div className="container">
            <CourseList />
        </div>
    );
}

export default CoursesPage;