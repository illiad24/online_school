import { useGetTeacherQuery } from "@/entities/teacher/api/teacherApi";
import TeacherItem from "@/entities/teacher/ui/TeacherItem";
import { useDeleteTeacherButton } from "@/features/teacher/deleteButton";
import DeleteButton from "@/features/teacher/deleteButton/ui/DeleteButton";
import AddButton from "@/shared/components/editButton/addButton/AddButton";
import EditButton from "@/shared/components/editButton/EditButton";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";

function TeacherList() {
    const { data: teachers, isLoading, error } = useGetTeacherQuery();
    const { handleDelete } = useDeleteTeacherButton();

    if (isLoading) {
        return (
            <div className="teacher-list teacher-list__status">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="teacher-list teacher-list__status">
                Error loading teachers
            </div>
        );
    }

    return (
        <div className="teacher-list">
            <div className="teacher-list__header-container">
                <h1 className="teacher-list__header">Список вчителів</h1>
                <AddButton text="Додати вчителя" handleClick={navigateRoutes.navigate.teachers.create} />
            </div>
            <div className="teacher-list__item-container">
                {teachers.map((teacher) => (
                    <TeacherItem
                        key={teacher._id}
                        teacher={teacher}
                        actions={[
                            <DeleteButton
                                key={teacher._id}
                                handleSubmit={() => handleDelete(teacher._id)}
                            />,
                            <EditButton handleClick={navigateRoutes.navigate.teachers.edit(teacher._id)} />
                        ]}
                    />
                ))}
            </div>
        </div>
    );
}

export default TeacherList;