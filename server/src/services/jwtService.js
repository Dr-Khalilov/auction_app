require('dotenv').config();
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const tokenConfig = {
    access: {
        life: process.env.ACCESS_TOKEN_LIFE,
        secret: process.env.ACCESS_TOKEN_SECRET,
    },
    refresh: {
        life: process.env.REFRESH_TOKEN_LIFE,
        secret: process.env.REFRESH_TOKEN_SECRET,
    },
};

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

const createToken = async (payload, { secret, life }) =>
    signJWT(payload, secret, { expiresIn: life });

const verifyToken = async (token, { secret }) => verifyJWT(token, secret);

module.exports.createTokenPair = async (payload = {}) => {
    return {
        refresh: await createToken(payload, tokenConfig.refresh),
        access: await createToken(payload, tokenConfig.access),
    };
};

module.exports.verifyAccessToken = token =>
    verifyToken(token, tokenConfig.access);

module.exports.verifyRefreshToken = token =>
    verifyToken(token, tokenConfig.refresh);
