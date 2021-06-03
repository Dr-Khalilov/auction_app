const createHttpError = require('http-errors');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
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

    static async signUp(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(createHttpError(400, errors));
            }
            const { body: { name, sur_name, login, email, password_hash } } = req;
            const candidate = await User.where({ email }).fetch({ require: false });
            if (candidate) {
                return next(createHttpError(400, 'User with email already exist'));
            }
            const hashPassword = bcrypt.hashSync(password_hash, process.env.SALT_ROUNDS);
            const user = await new User({ name, sur_name, login, email, password_hash: hashPassword }).save();
            res.status(201).send({ data: user });
            return res.json({ message: 'User successfully registered' });
        } catch (err) {
            next(err);
        }
    }

    static async signIn(req, res, next) {
        const {
            body: { email, password_hash },
        } = req;
        const user = await User.where({ email }).fetch({ require: false });
        if (!user) {
            return next(createHttpError(400), `User with ${email} not found`);
        }
        const validPassword = bcrypt.compareSync(password_hash, user.password_hash);
        if (!validPassword) {
            return next(createHttpError(400), 'Invalid credentials');
        }
        const userRole = await User.where({ role_id }).fetch({
            withRelated: ['roles_users'],
        });

        const token = generateAccessToken(user.id);
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
