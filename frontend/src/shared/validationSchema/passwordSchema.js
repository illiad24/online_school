import * as yup from 'yup';

const passwordSchema = yup.object({
    oldPassword: yup
        .string()
        .required('Пароль обов’язковий'),
    newPassword: yup
        .string()
        .required('Пароль обов’язковий'),
});

export default passwordSchema;
