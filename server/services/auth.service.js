const JWTService = require('./jwt.service');
const UserService = require('./user.service');

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
