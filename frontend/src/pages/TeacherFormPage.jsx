


import { useGetCoursesQuery } from "@/entities/cource/api/courseApi";
import { useTeacherForm } from "@/features/teacher/form/model/useTeacherFormSubmit";
import TeacherForm from "@/features/teacher/form/ui/TeacherForm";



function TeacherFormPage() {
    const { handleSubmit, register, errors, isLoading, isEditMode, teacher } = useTeacherForm();
    const mainTitle = isEditMode ? 'Редагувати вчителя' : 'Додати вчителя';
    console.log(teacher)
    const { data: coursesList } = useGetCoursesQuery();

    if (isLoading) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className="container">
            <h1>{mainTitle}</h1>
            <TeacherForm onSubmit={handleSubmit} teacher={teacher} coursesList={coursesList} register={register} errors={errors} />
        </div>
    );
}

export default TeacherFormPage;