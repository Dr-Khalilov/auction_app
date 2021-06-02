const createHttpError = require('http-errors');
const AuthService = require('../services/authService');
const User = require('../models/User');
const Role = require('../models/Role');
const RefreshToken = require('../models/RefreshToken');

module.exports.signUp = async (req, res, next) => {
    try {
        const { body } = req;
        const user = await User.create(body);
        if (user) {
            const data = await AuthService.createSession(user);
            return res.send({ data });
        }
        next(createHttpError(400, 'Unable to create user with provided data'));
    } catch (err) {
        next(err);
    }
};

module.exports.signIn = async (req, res, next) => {
    try {
        const {
            body: { email, password },
        } = req;
        const user = await User.findOne({ where: { email } });
        if (user && (await user.comparePassword(password))) {
            const data = await AuthService.createSession(user);
            return res.send({ data });
        }
        next(createHttpError(401, 'Invalid credentials'));
    } catch (err) {
        next(err);
    }
};

module.exports.refreshToken = async (req, res, next) => {
    try {
        const {
            body: { refreshToken },
        } = req;
        const refreshTokenInstance = await RefreshToken.fetchOne({
            where: { value: refreshToken },
        });
        const data = await AuthService.refreshSession(refreshTokenInstance);
        return res.send({ data });
    } catch (err) {
        next(err);
    }
};
