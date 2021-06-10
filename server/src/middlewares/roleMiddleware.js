require('dotenv').config();
const jwt = require('jsonwebtoken');
const RightsError = require('../errors/RightsError');

module.exports = roleUser = (roles) => {
    return (req, res, next) => {
        try {
            if (req.method === 'OPTIONS') {
                next();
            }
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'User not authorization' });
            }
            const { roles: userRoles } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return new RightsError();
            }
            next();
        } catch (err) {
            console.log(err);
            return res.status(403).json({ message: 'User not authorization' });
        }
    };
};