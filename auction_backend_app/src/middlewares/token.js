const createHttpError = require('http-errors');
const JWTService = require('../services/jwtService');
const TokenError = require('../errors/TokenError');

const checkAccessToken = async (req, res, next) => {
    try {
        const {
            headers: { authorization },
        } = req;
        if (authorization) {
            const [, token] = authorization.split(' ');
            req.tokenData = await JWTService.verifyAccessToken(token);
            console.log(req.tokenData);
            return next();
        }
        next(createHttpError(401, 'Need token'));
    } catch (err) {
        next(new TokenError(err));
    }
};

const checkRefreshToken = async (req, res, next) => {
    try {
        const {
            body: { refreshToken },
        } = req;
        console.log(refreshToken);
        req.tokenData = await JWTService.verifyRefreshToken(refreshToken);
        next();
    } catch (err) {
        next(createHttpError(401, 'Invalid refresh token'));
    }
};

module.exports.checkAccessToken = checkAccessToken;
module.exports.checkRefreshToken = checkRefreshToken;
