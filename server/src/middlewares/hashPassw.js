const bcrypt = require('bcryptjs');

const {
    env: { SALT_ROUNDS },
} = process;

module.exports.hashPassword = async (req, res, next) => {
    try {
        req.hashPassw = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        next();
    } catch (err) {
        next(err);
    }
};
