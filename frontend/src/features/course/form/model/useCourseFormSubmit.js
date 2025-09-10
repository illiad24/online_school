import { useForm } from "react-hook-form";
import { courseSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router";
import { useCreateCourseMutation, useGetCourseByIdQuery, useUpdateCourseMutation } from "@/entities/cource/api/courseApi";
import { useEffect, useState } from "react";

export function useCourseForm() {
    const { id } = useParams();
    const isEditMode = id !== 'new' && !!id;
    const navigate = useNavigate();

    const { data: course, isLoading, isError, error } = useGetCourseByIdQuery(id, { skip: !isEditMode });

    const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
    const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();

    const [generalError, setGeneralError] = useState(null);

    const methods = useForm({
        resolver: yupResolver(courseSchema),
        defaultValues: {
            title: '',
            description: '',
            teacher: '',
            lessons: [],
            price: 0,
        },
    });

    const { handleSubmit, reset, register, formState: { errors } } = methods;

    useEffect(() => {
        if (isEditMode && course) {
            reset({
                ...course,
                price: course.price ? Number(course.price) : 0,
            });
        }
    }, [isEditMode, course, reset]);

    const onSubmitHandler = async (data) => {
        setGeneralError(null);
        try {
            if (isEditMode) {
                await updateCourse({ id, data }).unwrap();
            } else {
                await createCourse(data).unwrap();
            }
            navigate('/courses');
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
        course,
        isError,
    };
}