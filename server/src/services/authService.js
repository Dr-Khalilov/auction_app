const JWTService = require('./jwtService');
const UserService = require('./userService');

const getTokenPayload = user => ({
    userId: user.id,
    email: user.email,
    role: user.role,
});

module.exports.createSession = async user => {
    const tokenPair = await JWTService.createTokenPair(getTokenPayload(user));
    if ((await user.countRefreshTokens()) <= process.env.MAX_DEVICES_AMOUNT) {
        await user.createRefreshToken({ value: tokenPair.refresh });
    } else {
        const [oldRefreshToken] = await user.getRefreshTokens({
            order: [['updated_at', 'ASC']],
        });
        await oldRefreshToken.update({
            value: tokenPair.refresh,
        });
        return {
            user: UserService.prepareUser(user),
            tokenPair,
        };
    }
};

module.exports.refreshSession = async refreshTokenInstance => {
    const user = await refreshTokenInstance.getUser();
    const tokenPair = await JWTService.createTokenPair(getTokenPayload(user));
    await refreshTokenInstance.update({
        value: tokenPair.refresh,
    });
    return {
        user: UserService.prepareUser(user),
        tokenPair,
    };
};
