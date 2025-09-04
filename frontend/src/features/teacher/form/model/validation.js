import * as yup from 'yup';

export const teacherSchema = yup.object({
    name: yup
        .string()
        .required('Ім’я обов’язкове')
        .min(2, 'Ім’я має містити мінімум 2 символи'),

    email: yup
        .string()
        .required('Email обов’язковий')
        .email('Некоректний формат email'),

    subject: yup
        .string()
        .required('Предмет обов’язковий')
        .min(3, 'Предмет має містити мінімум 3 символи'),

    bio: yup
        .string()
        .max(500, 'Біографія не може перевищувати 500 символів'),

    experience: yup
        .number()
        .typeError('Досвід має бути числом')
        .required('Досвід обов’язковий')
        .min(0, 'Досвід не може бути від’ємним'),

    age: yup
        .number()
        .typeError('Вік має бути числом')
        .required('Вік обов’язковий')
        .min(18, 'Вік має бути від 18 років'),

    courses: yup
        .array()
        .min(1, 'Виберіть хоча б один курс')
        .required('Це поле є обов’язковим'),
}).required();

