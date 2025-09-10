import { useGetLessonsQuery } from "@/entities/lesson/api/lessonApi";
import { useLessonForm } from "@/features/lesson/model/useLessonForm";
import LessonForm from "@/features/lesson/ui/LessonForm";

function LessonsFormPage() {
    const { handleSubmit, register, errors, isLoading, isEditMode, lesson, generalError } = useLessonForm();
    const { data: lessonsList, isLoading: isLessonsLoading } = useGetLessonsQuery();
    console.log(lessonsList)
    if (isLoading || isLessonsLoading) {
        return <div>Завантаження...</div>;
    }
    return (
        <div>
            <LessonForm
                onSubmit={handleSubmit}
                register={register}
                errors={errors}
                isLoading={isLoading}
                isEditMode={isEditMode}
                lesson={lesson}
                lessonsList={lessonsList}
                generalError={generalError}
            />
        </div>
    );
}


export default LessonsFormPage;