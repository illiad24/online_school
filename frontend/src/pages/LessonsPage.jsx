import { useDeleteLessonMutation, useGetLessonsQuery } from "@/entities/lesson/api/lessonApi";
import LessonItem from "@/entities/lesson/ui/LessonItem";
import AddButton from "@/shared/components/addButton/AddButton";
import DeleteButton from "@/shared/components/deleteButton/DeleteButton";
import EditButton from "@/shared/components/editButton/EditButton";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";

function LessonsPage() {
    const { data: lessonsList, isLoading, isError } = useGetLessonsQuery();
    const [deleteLesson] = useDeleteLessonMutation();
    function handleDelete(id) {
        deleteLesson(id);
    }

    if (isLoading) {
        return <div>Завантаження...</div>;
    }
    if (isError) {
        return <div>Помилка завантаження уроків</div>;
    }
    return (
        <div>
            LessonsPage
            <AddButton text="Додати урок" handleClick={navigateRoutes.navigate.lessons.create} />
            <hr />
            <br />
            <div>
                {lessonsList.map((lesson) => (
                    <LessonItem key={lesson._id} lesson={lesson} actions={[
                        <DeleteButton handleSubmit={() => handleDelete(lesson._id)} />,
                        <EditButton handleClick={navigateRoutes.navigate.lessons.edit(lesson._id)} />
                    ]} />
                ))}
            </div>
        </div>
    );
}

export default LessonsPage;