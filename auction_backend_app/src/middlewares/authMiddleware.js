require('dotenv').config();
const jwt = require('jsonwebtoken');
const TokenError = require('../errors/TokenError');
const RightsError = require('../errors/RightsError');

module.exports = authUser = async (req, res, next) => {
    try {
        if (req.method === 'OPTIONS') {
            next();
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'User not authorization' });
        }
        const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decodedData;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'User not authorization' });
    }
};