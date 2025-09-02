import { checkSchema } from "express-validator";

export const teacherValidator = checkSchema({
    name: {
        notEmpty: {
            errorMessage: "Ім'я є обов'язковим",
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "Ім'я має містити щонайменше 2 символи",
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
    subject: {
        notEmpty: {
            errorMessage: "Предмет є обов'язковим",
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "Предмет має містити щонайменше 2 символи",
        },
    },
    age: {
        notEmpty: {
            errorMessage: "Вік є обов'язковим",
        },
        isInt: {
            options: { min: 0 },
            errorMessage: "Вік має бути цілим числом та не менше 0",
        },
    },
    experience: {
        notEmpty: {
            errorMessage: "Досвід є обов'язковим",
        },
        isInt: {
            options: { min: 0 },
            errorMessage: "Досвід має бути цілим числом та не менше 0",
        },
    },
    courses: {
        notEmpty: {
            errorMessage: "Курси є обов'язковими",
        },
    },
    bio: {
        optional: true,
        isLength: {
            options: { max: 500 },
            errorMessage: "Біографія не може перевищувати 500 символів",
        },
    }
});
