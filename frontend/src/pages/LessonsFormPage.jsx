import { useGetLessonsQuery } from "@/entities/lesson/api/lessonApi";
import { useGetTeachersQuery } from "@/entities/teacher/api/teacherApi";
import GenericForm from "@/features/FormBuilder/GenericForm";
import { useLessonForm } from "@/features/lesson/model/useLessonForm";

function LessonsFormPage() {
    const { handleSubmit, register, errors, isLoading, isEditMode, lesson, generalError } = useLessonForm();
    const { data: lessonsList, isLoading: isLessonsLoading } = useGetLessonsQuery();
    const { data: teacherList, isLoading: isteacherListLoading } = useGetTeachersQuery();

    console.log(lessonsList);


    if (isLoading || isLessonsLoading || isteacherListLoading) {
        return <div>Завантаження...</div>;
    }
    return (
        <div>
            {/* <LessonForm
                onSubmit={handleSubmit}
                register={register}
                errors={errors}
                isLoading={isLoading}
                isEditMode={isEditMode}
                lesson={lesson}
                lessonsList={lessonsList}
                generalError={generalError}
            /> */}
            <GenericForm
                onSubmit={handleSubmit}
                register={register}
                errors={errors}
                formTitle={isEditMode ? "Редагувати урок" : "Додати урок"}
                submitLabel="Зберегти"
                error={generalError}
                defaultValues={lesson || {}}
                fields={[
                    { name: 'title', label: 'Назва', validation: { required: 'Обов’язково', minLength: 3 } },
                    { name: 'content', label: 'Зміст', multiline: true, rows: 4, validation: { required: 'Обов’язково', minLength: 10 } },
                    { name: 'duration', label: 'Тривалість (хв)', type: 'number', validation: { required: 'Обов’язково', min: 0 } },
                    { type: 'select', name: 'teacher', label: 'Викладач', options: teacherList.map(t => ({ value: t._id, label: t.name })), validation: { required: 'Обов’язково' } },
                    { name: 'videoUrl', label: 'Посилання на відео' },
                ]}
            />
        </div>
    );
}


export default LessonsFormPage;