// src/features/lesson/form/model/validation.js
import * as yup from "yup";

export const lessonSchema = yup.object({
    title: yup
        .string()
        .required("Назва уроку є обов'язковою")
        .min(3, "Назва повинна містити щонайменше 3 символи")
        .max(100, "Назва не може перевищувати 100 символів"),

    content: yup
        .string()
        .required("Зміст уроку є обов'язковим")
        .min(10, "Зміст повинен містити щонайменше 10 символів")
        .max(2000, "Зміст не може перевищувати 2000 символів"),

    duration: yup
        .number()
        .typeError("Тривалість має бути числом")
        .required("Тривалість уроку є обов'язковою")
        .min(1, "Тривалість має бути хоча б 1 хвилина")
        .max(600, "Тривалість не може перевищувати 600 хв (10 годин)"),

    teacher: yup
        .string()
        .required("Викладач є обов'язковим"),
}).required();
