const bcrypt = require('bcryptjs');

module.exports.hashPassword = async (req, res, next) => {
    try {
        const { body: { password_hash } } = req;
        const hashPassword = await bcrypt.hash(password_hash, process.env.SALT_ROUNDS);
        res.send(hashPassword);
    } catch (err) {
        next(err);
    }
};
