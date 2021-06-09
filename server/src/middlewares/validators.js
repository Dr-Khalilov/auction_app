const { SIGN_IN_SCHEMA, SIGN_UP_SCHEMA } = require('../services/validationSchemas');
const BadRequestError = require('../errors/BadRequestError');

module.exports.validateSignUpData = async (req, res, next) => {
    const validationResult = await SIGN_UP_SCHEMA.isValid(req.body);
    if (!validationResult) {
        return next(new BadRequestError('Invalid data for registration'));
    } else {
        next();
    }
};

module.exports.validateSignInData = async (req, res, next) => {
    const validationResult = await SIGN_IN_SCHEMA.isValid(req.body);
    console.log(validationResult);
    if (validationResult) {
        next();
    } else {
        return next(new BadRequestError('Invalid data for login'));
    }
};
