import { checkSchema } from "express-validator";

export const courseValidator = checkSchema({
    title: {
        notEmpty: {
            errorMessage: "Назва є обов'язковою",
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "Назва має містити щонайменше 3 символи",
        },
    },
    description: {
        notEmpty: {
            errorMessage: "Опис є обов'язковим",
        },
        isLength: {
            options: { min: 10 },
            errorMessage: "Опис має містити щонайменше 10 символів",
        },
    },
    teacher: {
        notEmpty: {
            errorMessage: "Викладач є обов'язковим",
        },
        isMongoId: {
            errorMessage: "Некоректний ID викладача",
        },
    },
    lessons: {
        notEmpty: {
            errorMessage: "Уроки є обов'язковими",
        },
    },
    price: {
        notEmpty: {
            errorMessage: "Ціна є обов'язковою",
        },
    },
});