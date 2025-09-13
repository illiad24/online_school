import { useDeleteCourseMutation, useGetCoursesQuery } from "@/entities/cource/api/courseApi";
import CourseItem from "@/entities/cource/ui/CourseItem";
import { selectAuthUser } from "@/features/auth";
import DeleteButton from "@/features/teacher/deleteButton/ui/DeleteButton";
import AddButton from "@/shared/components/addButton/AddButton";
import EditButton from "@/shared/components/editButton/EditButton";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { useState } from "react";
import { useSelector } from "react-redux";

function CourseList() {
    const user = useSelector(selectAuthUser)
    const userRole = user?.role?.title;
    
    const isSuperAdmin = userRole === 'admin';
    const isAdmin = userRole === 'admin' || userRole === 'manager';
    
    const { data: courses, isLoading } = useGetCoursesQuery();
    const [deleteCourse] = useDeleteCourseMutation();

    const [openLessonFormFor, setOpenLessonFormFor] = useState(null);

    if (isLoading) {
        return <div>Завантаження...</div>;
    }

    if (!courses || courses.length === 0) {
        return (
            <div>
                <h1>Список курсів</h1>
                <p>Курси ще не додано.</p>
                {(userRole === 'admin' || userRole === 'manager') && (
                    <AddButton
                        text="Додати курс"
                        handleClick={navigateRoutes.navigate.courses.create}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="course-list">
            <div className="course-list__header">
                <h1>Список курсів</h1>
                {(isAdmin) && (
                    <AddButton
                        text="Додати курс"
                        handleClick={navigateRoutes.navigate.courses.create}
                    />
                )}
            </div>

            {courses.map((course) => (
                <CourseItem
                    key={course._id}
                    course={course}
                    isAddingLesson={openLessonFormFor === course._id}
                    actions={[
                        (isAdmin) && (
                            <AddButton
                                key={`add-lesson-${course._id}`}
                                text={
                                    openLessonFormFor === course._id
                                        ? "Закрити форму"
                                        : "Додати урок"
                                }
                                type="button"
                                handleClick={() =>
                                    setOpenLessonFormFor((prev) =>
                                        prev === course._id ? null : course._id
                                    )
                                }
                            />
                        ),
                        (isSuperAdmin) && (
                            <DeleteButton
                                key={`delete-${course._id}`}
                                handleSubmit={() => deleteCourse(course._id)}
                            />),
                        (isAdmin) && (
                            < EditButton
                                key={`edit-${course._id}`}
                                handleClick={navigateRoutes.navigate.courses.edit(
                                    course._id
                                )}
                            />
                        )
                    ]}
                />
            ))}
        </div>
    );
}

export default CourseList;
