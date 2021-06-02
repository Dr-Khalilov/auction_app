const { SIGN_IN_SCHEMA, SIGN_UP_SCHEMA } = require('../services/validations');
const Error = require('../errors/errorHandler');

module.exports.validateSignUpData = async (req, res, next) => {
    const validationResult = await SIGN_UP_SCHEMA.isValid(req.body);
    if (!validationResult) {
        return next(new Error('Invalid data for registration'));
    } else {
        next();
    }
};

module.exports.validateSignInData = async (req, res, next) => {
    const validationResult = await SIGN_IN_SCHEMA.isValid(req.body);
    if (validationResult) {
        next();
    } else {
        return next(new Error('Invalid data for login'));
    }
};
