import { useGetLessonsQuery } from "@/entities/lesson/api/lessonApi";

function SelectLesson() {
    const { data: lessonsList, isLoading, isError } = useGetLessonsQuery();
    if (isLoading) {
        return <div>Завантаження...</div>;
    }
    if (isError) {
        return <div>Помилка завантаження уроків</div>;
    }
    return (
        <div>
            <form>
                <select>
                    <option value="" selected>Оберіть урок</option>
                    {lessonsList.map(lesson => (
                        <option key={lesson._id} value={lesson._id}>
                            {lesson.title}
                        </option>
                    ))}
                </select>
                <button type="submit">Додати урок</button>
            </form>
        </div>
    );
}

export default SelectLesson;