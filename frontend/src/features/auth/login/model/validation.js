import * as yup from 'yup';

const schema = yup.object({
    email: yup
        .string()
        .required('Email обов’язковий')
        .email('Некоректний формат email'),

    password: yup
        .string()
        .required('Пароль обов’язковий')
});

export default schema;