import { useState } from "react";
import { useAddLessonToCourseMutation } from "@/entities/cource/api/courseApi";
import { useGetLessonsQuery } from "@/entities/lesson/api/lessonApi";

function SelectLesson({ courseId }) {
    const { data: lessonsList, isLoading, isError } = useGetLessonsQuery();
    const [selectedLesson, setSelectedLesson] = useState("");
    const [addLessonToCourse, { isLoading: isSubmitting }] = useAddLessonToCourseMutation();

    if (isLoading) {
        return <div>Завантаження...</div>;
    }

    if (isError) {
        return <div>Помилка завантаження уроків</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedLesson) {
            alert("Будь ласка, оберіть урок!");
            return;
        }

        try {
            await addLessonToCourse({ courseId, lessonId: selectedLesson }).unwrap();
            setSelectedLesson("");
        } catch (error) {
            alert("Сталася помилка ❌");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <select value={selectedLesson} onChange={(e) => setSelectedLesson(e.target.value)}>
                    <option value="">Оберіть урок</option>
                    {lessonsList.map((lesson) => (
                        <option key={lesson._id} value={lesson._id}>
                            {lesson.title}
                        </option>
                    ))}

                </select>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Додаємо..." : "Додати урок"}
                </button>
            </form>
        </div>
    );
}

export default SelectLesson;