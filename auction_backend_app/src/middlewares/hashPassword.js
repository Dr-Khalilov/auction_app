require('dotenv').config();
const bcrypt = require('bcryptjs');
const ServerError = require('../errors/ServerError');

module.exports.hashPassword = async (req, res, next) => {
    try {
        const { body: { password } } = req;
        let salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        req.body.password_hash = await bcrypt.hash(password, salt);
        delete req.body.password;
        next();
    } catch (err) {
        next(new ServerError('Server error on hash password'));
    }
};
