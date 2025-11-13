import { useForm } from "react-hook-form";
import { teacherSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router";
import { useAddTeacherMutation, useGetTeacherByIdQuery, useUpdateTeacherMutation } from "@/entities/teacher/api/teacherApi";
import { useEffect, useState } from "react";

export function useTeacherForm() {
    const { id } = useParams();
    const isEditMode = id !== 'new' && !!id;
    const navigate = useNavigate();

    const { data: teacher, isLoading, isError, error } = useGetTeacherByIdQuery(id, { skip: !isEditMode });

    const [updateTeacher, { isLoading: isUpdating }] = useUpdateTeacherMutation();
    const [addTeacher, { isLoading: isCreating }] = useAddTeacherMutation();

    const [generalError, setGeneralError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);


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

    useEffect(() => {
        if (isEditMode && teacher) {
            reset({
                ...teacher,
                users: teacher.courses ? teacher.courses.map((el) => el._id) : [],
                experience: teacher.experience ? Number(teacher.experience) : 0,
                age: teacher.age ? Number(teacher.age) : 0,
            });
        }
    }, [isEditMode, teacher, reset]);

    const onSubmitHandler = async (data) => {
        setGeneralError(null);
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value) || typeof value === 'object') {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        try {
            if (isEditMode) {
                await updateTeacher({ id, formData }).unwrap();
            } else {
                await addTeacher(formData).unwrap();
            }
            navigate('/teachers');
        } catch (error) {
            setGeneralError(error);
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmitHandler),
        errors,
        generalError,
        isLoading: isLoading || isUpdating || isCreating,
        isEditMode,
        teacher,
        isError,
        selectedImage,
        setSelectedImage
    };
}