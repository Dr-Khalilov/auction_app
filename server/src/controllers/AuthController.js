require('dotenv').config();
const AuthService = require('../services/AuthService');
const User = require('../models/User');

class AuthControllers {
    static async signUp(req, res) {
        const { body } = req;
        const user = await AuthService.registerUser(body);
        return res.send({ data: user });
    }

    static async signIn(req, res) {
        const { body } = req;
        const user = await AuthService.loginUser(body);
        return res.send({ data: user });


        // if (user && (await user.comparePassword(password))) {
        //     const data = await AuthService.createSession(user);
        //     return res.send({ data });
        // }
        // next(createHttpError(401, 'Invalid credentials'));
    }

    static async getUsers(req, res, next) {
        const { user } = req;
        const users = await User.fetchAll({
            ...user,
        });
        if (!users) {
            return next(createHttpError(404, 'Users not found'));
        }
        res.status(200).send({ data: users });
    }

    // static async refreshToken (req, res, next) {
    //     const {
    //         body: { refreshToken },
    //     } = req;
    //     const refreshTokenInstance = await RefreshToken.fetchOne({
    //         where: { value: refreshToken },
    //     });
    //     const data = await AuthService.refreshSession(refreshTokenInstance);
    //     return res.send({ data });
    // }
}

module.exports = AuthControllers;
