import { useDeleteCourseMutation, useGetCoursesQuery } from "@/entities/cource/api/courseApi";
import CourseItem from "@/entities/cource/ui/CourseItem";
import DeleteButton from "@/features/teacher/deleteButton/ui/DeleteButton";
import AddButton from "@/shared/components/addButton/AddButton";
import EditButton from "@/shared/components/editButton/EditButton";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";

function CourseList() {
    const { data: courses, isLoading } = useGetCoursesQuery();
    const [deleteCourse] = useDeleteCourseMutation();

    if (isLoading) {
        return <div>Завантаження...</div>;
    }

    if (!courses || courses.length === 0) {
        return (
            <div>
                <h1>Список курсів</h1>
                <p>Курси ще не додано.</p>
                <AddButton text="Додати курс" handleClick={navigateRoutes.navigate.courses.create} />
            </div>
        );
    }

    return (
        <div className="course-list">
            <div className="course-list__header">
                <h1>Список курсів</h1>
                <AddButton text="Додати курс" handleClick={navigateRoutes.navigate.courses.create} />
            </div>
            {courses.map(course => (
                <CourseItem
                    key={course._id}
                    course={course}
                    actions={[
                        <DeleteButton
                            key={`delete-${course._id}`}
                            handleSubmit={() => deleteCourse(course._id)}
                        />,
                        <EditButton
                            key={`edit-${course._id}`}
                            handleClick={navigateRoutes.navigate.courses.edit(course._id)}
                        />
                    ]}
                />
            ))}
        </div>
    );
}

export default CourseList;