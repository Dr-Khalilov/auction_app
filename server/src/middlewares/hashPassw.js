const ServerError = require('../errors/ServerError');
const bcrypt = require('bcryptjs');

module.exports.hashPassword = async (req, res, next) => {
    try {
        const { body: { password_hash } } = req;
        req.hashPassword = await bcrypt.hash(password_hash, process.env.SALT_ROUNDS);
        next();
    } catch (err) {
        next(new ServerError('Server error on hash password'));
    }
};
