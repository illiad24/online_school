import { useForm } from "react-hook-form";
import { teacherSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router";
import { useAddTeacherMutation, useGetTeacherByIdQuery, useUpdateTeacherMutation } from "@/entities/teacher/api/teacherApi";
import { useEffect } from "react";
export function useTeacherForm() {
    const { id } = useParams();
    const isEditMode = id !== 'new' && !!id;
    const navigate = useNavigate();

    // Fetch teacher data if in edit mode
    const { data: teacher, isLoading, isError } = useGetTeacherByIdQuery(id, { skip: !isEditMode });

    // Use mutations for creating and updating
    const [updateTeacher, { isLoading: isUpdating }] = useUpdateTeacherMutation();
    const [addTeacher, { isLoading: isCreating }] = useAddTeacherMutation();

    const methods = useForm({
        resolver: yupResolver(teacherSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            bio: '',
            experience: 0,
            age: 0,
            courses: '',
        },
    });
    const { handleSubmit, reset, register, formState: { errors } } = methods;

    // Set form values when data is loaded (for edit mode)
    useEffect(() => {
        if (isEditMode && teacher) {
            reset({
                ...teacher,
                // Ensure number inputs have correct types
                experience: teacher.experience ? Number(teacher.experience) : 0,
                age: teacher.age ? Number(teacher.age) : 0,
            });
        }
    }, [isEditMode, teacher, reset]);

    const onSubmitHandler = async (data) => {
        try {
            console.log(data)
            if (isEditMode) {
                // Call update mutation
                await updateTeacher({ data });
            } else {
                // Call create mutation
                await addTeacher(data);
            }
            // Optional: navigate to the list page after success
            navigate('/teachers');
        } catch (error) {
            console.error("Failed to save the teacher:", error);
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmitHandler),
        errors,
        isLoading: isLoading || isUpdating || isCreating,
        isEditMode,
        teacher, // Return the teacher data for context in the component
    };
}