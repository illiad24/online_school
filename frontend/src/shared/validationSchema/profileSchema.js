import * as yup from "yup";

export const getProfileSchema = (initialValues) => {
    return yup.object({
        email: yup
            .string()
            .required("Email обов’язковий")
            .email("Некоректний формат email"),

        name: yup.string().required("Ім’я обов’язкове"),

        number: yup
            .number()
            .nullable()
            .transform((value, originalValue) =>
                String(originalValue).trim() === "" ? null : value
            )
            .typeError("Має бути числом")
            .when([], {
                is: () => !!initialValues?.number, // якщо вже є значення в БД
                then: (schema) => schema.required("Номер не можна очистити"),
            })
            .test(
                "phone-format",
                "Номер повинен містити лише цифри та може починатися з +",
                (value) => {
                    if (!value) return true; // пусте поле допустиме
                    const regex = /^\+?\d{5,15}$/;
                    return regex.test(String(value));
                }
            ),

        age: yup
            .number()
            .nullable()
            .transform((value, originalValue) =>
                String(originalValue).trim() === "" ? null : value
            )
            .positive("Має бути більше 0")
            .integer("Має бути цілим числом")
            .typeError("Має бути числом")
            .when([], {
                is: () => !!initialValues?.age, // якщо вже є значення
                then: (schema) => schema.required("Вік не можна очистити"),
            })
            .test(
                "age-range",
                "Вік повинен бути від 1 до 120",
                (value) => {
                    if (value === null || value === undefined) return true;
                    return value >= 1 && value <= 120;
                }
            ),
    });
};
