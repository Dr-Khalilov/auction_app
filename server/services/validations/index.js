const yup = require('yup');

export const NAME_SCHEMA = yup
    .string()
    .matches(/^[A-ZА-Я][a-zа-я]{3,128}$/)
    .required();

module.exports.SIGN_UP_SCHEMA = yup.object().shape({
    name: NAME_SCHEMA,
    surName: NAME_SCHEMA,
    login: yup
        .string()
        .required()
        .min(3),
    email: yup
        .string()
        .email()
        .required()
        .min(5),
    password: yup
        .string()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/
        )
        .required(),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password')])
        .required(),
    role: yup
        .string()
        .oneOf(['admin', 'user'])
        .required(),
});

module.exports.SIGN_IN_SCHEMA = yup.object({
    login: yup
        .string()
        .required()
        .min(3),
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/
        )
        .required(),
});
