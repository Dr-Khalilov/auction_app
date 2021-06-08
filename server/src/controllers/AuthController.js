require('dotenv').config();
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const AuthService = require('../services/AuthService');

const User = require('../models/User');
const Role = require('../models/Role');
const RefreshToken = require('../models/RefreshToken');


const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles,
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
};

class AuthControllers {

    static async signUp(req, res) {
        const { body } = req;
        const user = await AuthService.registerUser(body);
        return res.send({ data: user });
    }


    static async signIn(req, res, next) {
        const {
            body: { email, password_hash },
        } = req;
        const user = await User.where({ email }).fetch({ require: false });
        if (!user) {
            return next(createHttpError(400, `User with ${email} not found`));
        }
        const validPassword = bcrypt.compareSync(password_hash, user.password_hash);
        if (!validPassword) {
            return next(createHttpError(400, 'Invalid credentials'));
        }

        const userRole = await User.where({ id: 4 }).fetch({
            withRelated: ['roles'],
            require: true,
        });
        const token = generateAccessToken(user.id, userRole);

        return res.json({ token });

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
