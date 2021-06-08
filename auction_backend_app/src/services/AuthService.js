require('dotenv').config();
const createHttpError = require('http-errors');
const JWTService = require('./jwtService');
const UserService = require('./userService');
const User = require('../models/User');
const UserAlreadyExistError = require('../errors/UserAlreadyExistError');

const getTokenPayload = user => ({
    userId: user.id,
    email: user.email,
    role: user.role,
});

class AuthService {

    static async registerUser({ name, sur_name, login, email, password_hash }) {
        const candidate = await User.where({ email }).fetch({ require: false });
        if (candidate) {
            throw new UserAlreadyExistError();
        }
        return await new User({ name, sur_name, login, email, password_hash }).save();
    }


    // static async createSession(user) {
    //     const tokenPair = await JWTService.createTokenPair(
    //         getTokenPayload(user),
    //     );
    //     if (
    //         (await user.countRefreshTokens()) <= process.env.MAX_DEVICES_AMOUNT
    //     ) {
    //         await user.createRefreshToken({ value: tokenPair.refresh });
    //     } else {
    //         const [oldRefreshToken] = await user.getRefreshTokens({
    //             order: [['updated_at', 'ASC']],
    //         });
    //         await oldRefreshToken.update({
    //             value: tokenPair.refresh,
    //         });
    //         return {
    //             user: UserService.prepareUser(user),
    //             tokenPair,
    //         };
    //     }
    // }

    // static async refreshSession(refreshTokenInstance) {
    //     const user = await refreshTokenInstance.getUser();
    //     const tokenPair = await JWTService.createTokenPair(
    //         getTokenPayload(user),
    //     );
    //     await refreshTokenInstance.update({
    //         value: tokenPair.refresh,
    //     });
    //     return {
    //         user: UserService.prepareUser(user),
    //         tokenPair,
    //     };
    // }
}

module.exports = AuthService;
