// src/features/lesson/form/model/useLessonForm.js
import { useForm } from "react-hook-form";
import { lessonSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router";

import { useEffect, useState } from "react";
import { useCreateLessonMutation, useGetLessonByIdQuery, useUpdateLessonMutation } from "@/entities/lesson/api/lessonApi";

export function useLessonForm() {
    const { id } = useParams();
    const isEditMode = id !== "new" && !!id;
    const navigate = useNavigate();

    const {
        data: lesson,
        isLoading,
        isError,
        error
    } = useGetLessonByIdQuery(id, { skip: !isEditMode });

    const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();
    const [addLesson, { isLoading: isCreating }] = useCreateLessonMutation();

    const [generalError, setGeneralError] = useState(null);

    const methods = useForm({
        resolver: yupResolver(lessonSchema),
        defaultValues: {
            title: "",
            content: "",
            duration: 0,
            teacher: "",
        },
    });

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = methods;

    useEffect(() => {
        if (isEditMode && lesson) {
            reset({
                ...lesson,
                duration: lesson.duration ? Number(lesson.duration) : 0,
                teacher: lesson.teacher?._id || lesson.teacher || "",
            });
        }
    }, [isEditMode, lesson, reset]);

    const onSubmitHandler = async (data) => {
        setGeneralError(null);
        try {
            if (isEditMode) {
                data.updatedAt = new Date().toISOString();
                await updateLesson({ id, data }).unwrap();
            } else {
                await addLesson(data).unwrap();
            }
            navigate("/lessons");
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
        lesson,
        isError,
    };
}
