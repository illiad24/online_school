import { checkSchema } from "express-validator";

export const loginValidator = checkSchema({
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