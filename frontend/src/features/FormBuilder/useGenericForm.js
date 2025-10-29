import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export function useGenericForm({
    schema,
    getByIdApi,
    createApi,
    updateApi,
    defaultValues = {},
    imageField = null,
    navigateTo = "/",
}) {
    const { id } = useParams();
    const isEditMode = id !== "new" && !!id;
    const navigate = useNavigate();
    const [generalError, setGeneralError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const { data: entity, isLoading: isFetching } = getByIdApi ? getByIdApi(id, { skip: !isEditMode }) : { data: null, isLoading: false };
    const [createEntity, { isLoading: isCreating }] = createApi;
    const [updateEntity, { isLoading: isUpdating }] = updateApi;

    const methods = useForm({
        resolver: schema ? yupResolver(schema) : undefined,
        defaultValues: defaultValues || {},
    });

    const { handleSubmit, reset, control, register, formState: { errors } } = methods;

    useEffect(() => {
        if (isEditMode && entity) {
            const values = { ...entity };
            // Якщо є числові поля
            Object.keys(defaultValues).forEach(key => {
                if (typeof defaultValues[key] === "number" && entity[key] != null) {
                    values[key] = Number(entity[key]);
                }
            });
            reset(values);
        }
    }, [isEditMode, entity, reset]);

    const onSubmitHandler = async (data) => {
        setGeneralError(null);
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => formData.append(key, v)); // масиви окремо
            } else if (typeof value === "object" && value !== null) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        if (imageField && selectedImage) {
            formData.append(imageField, selectedImage);
        }

        try {
            if (isEditMode) {
                await updateEntity({ id, formData }).unwrap();
            } else {
                await createEntity(formData).unwrap();
            }
            navigate(navigateTo);
        } catch (err) {
            setGeneralError(err);
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmitHandler),
        errors,
        generalError,
        isLoading: isFetching || isCreating || isUpdating,
        isEditMode,
        entity,
        selectedImage,
        setSelectedImage,
        control
    };
}
