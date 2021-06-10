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
