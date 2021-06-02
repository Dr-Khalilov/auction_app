const createHttpError = require('http-errors');
const AuthService = require('../services/authService');
const User = require('../models/User');
const Role = require('../models/Role');
const RefreshToken = require('../models/RefreshToken');

class AuthControllers {
    static async signUp (req, res, next) {
        const { body } = req;
        const user = await User.create(body);
        if (user) {
            const data = await AuthService.createSession(user);
            return res.send({ data });
        }
        next(createHttpError(400, 'Unable to create user with provided data'));
    }

    static async signIn (req, res, next) {
        const {
            body: { email, password },
        } = req;
        const user = await User.findOne({ where: { email } });
        if (user && (await user.comparePassword(password))) {
            const data = await AuthService.createSession(user);
            return res.send({ data });
        }
        next(createHttpError(401, 'Invalid credentials'));
    }

    static async refreshToken (req, res, next) {
        const {
            body: { refreshToken },
        } = req;
        const refreshTokenInstance = await RefreshToken.fetchOne({
            where: { value: refreshToken },
        });
        const data = await AuthService.refreshSession(refreshTokenInstance);
        return res.send({ data });
    }
}

module.exports = AuthControllers;
