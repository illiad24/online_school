import { checkSchema } from "express-validator";

export const signupValidator = checkSchema({
    name: {
        notEmpty: {
            errorMessage: "Ім'я є обов'язковим",
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "Ім'я має містити щонайменше 3 символи",
        },
    },
    email: {
        notEmpty: {
            errorMessage: "Email є обов'язковим",
        },
        isEmail: {
            errorMessage: "Некоректний формат email",
        },
        normalizeEmail: true,
    },
    password: {
        notEmpty: {
            errorMessage: "Пароль є обов'язковим",
        },
        isLength: {
            options: { min: 6 },
            errorMessage: "Пароль має бути мінімум 6 символів",
        },
    },
});
