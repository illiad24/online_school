import * as yup from 'yup';

export const courseSchema = yup.object({
    title: yup
        .string()
        .required('Назва є обов\'язковою')
        .min(3, 'Назва має містити щонайменше 3 символи')
        .max(100, 'Назва має містити не більше 100 символів'),

    description: yup
        .string()
        .required('Опис є обов\'язковим')
        .min(10, 'Опис має містити щонайменше 10 символів')
        .max(500, 'Опис має містити не більше 500 символів'),

    // teacher: yup
    //     .string()
    //     .required('Ідентифікатор вчителя є обов\'язковим'),

    price: yup
        .number()
        .typeError('Ціна має бути числом')
        .required('Ціна є обов\'язковою')
        .min(0, 'Ціна має бути не менше 0'),
}).required();