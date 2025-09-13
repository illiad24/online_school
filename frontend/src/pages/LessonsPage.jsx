import { useDeleteLessonMutation, useGetLessonsQuery } from "@/entities/lesson/api/lessonApi";
import LessonItem from "@/entities/lesson/ui/LessonItem";
import { selectAuthUser } from "@/features/auth";
import AddButton from "@/shared/components/addButton/AddButton";
import DeleteButton from "@/shared/components/deleteButton/DeleteButton";
import EditButton from "@/shared/components/editButton/EditButton";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { useSelector } from "react-redux";

function LessonsPage() {
    const user = useSelector(selectAuthUser)
    const userRole = user?.role?.title;

    const isSuperAdmin = userRole === 'admin';
    const isAdmin = userRole === 'admin' || userRole === 'manager';
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
            {(isAdmin) && (
                <AddButton text="Додати урок" handleClick={navigateRoutes.navigate.lessons.create} />
            )}
            <hr />
            <br />
            <div>
                {lessonsList.map((lesson) => (
                    <LessonItem key={lesson._id} lesson={lesson} actions={[
                        (isSuperAdmin) && (
                            <DeleteButton handleSubmit={() => handleDelete(lesson._id)} />),
                        (isAdmin) && (
                            <EditButton handleClick={navigateRoutes.navigate.lessons.edit(lesson._id)} />
                        )
                    ]} />
                ))}
            </div>
        </div>
    );
}

export default LessonsPage;