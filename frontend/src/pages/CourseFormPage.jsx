// import { useGetLessonsQuery } from "@/entities/lesson/api/lessonApi";
import { useGetTeachersQuery } from "@/entities/teacher/api/teacherApi";
import { useCourseForm } from "@/features/course/form/model/useCourseFormSubmit";
import CourseForm from "@/features/course/form/ui/CourseForm";


function CourseFormPage() {
    const { handleSubmit, register, errors, isLoading, isEditMode, course, generalError } = useCourseForm();
    const mainTitle = isEditMode ? 'Редагувати курс' : 'Додати курс';

    const { data: teachersList, isLoading: isTeachersLoading } = useGetTeachersQuery();

    if (isLoading || isTeachersLoading) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className="container">
            <h1>{mainTitle}</h1>
            <CourseForm
                onSubmit={handleSubmit}
                course={course}
                teachersList={teachersList}
                // lessonsList={lessonsList}
                register={register}
                errors={errors}
                error={generalError}
            />
        </div>
    );
}

export default CourseFormPage;