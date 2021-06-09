require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const Role_User = require('../models/Role_User');
const UserAlreadyExistError = require('../errors/UserAlreadyExistError');
const IncorrectPassword = require('../errors/IncorrectPassword');

const getTokenPayload = user => ({
    userId: user.id,
    email: user.email,
    role: user.role,
});

const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles,
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
};

class AuthService {

    static async registerUser({ name, sur_name, login, email, password }) {
        const candidate = await User.where({ email }).fetch({ require: false });
        if (candidate) {
            throw new UserAlreadyExistError();
        }
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        const password_hash = await bcrypt.hash(password, salt);
        await new User({ name, sur_name, login, email, password_hash }).save();

        const userObj = await User.where({ email }).fetch({ require: false });
        const roleObj = await Role.where({ id: 2 }).fetch({ require: false });
        const { attributes: { id } } = userObj;
        const { attributes: { id: roleId } } = roleObj;
        console.log(id);
        console.log(roleId);
        await new Role_User().save(roleId, id);
    }


    static async loginUser({ email, password }) {
        const user = await User.where({ email }).fetch({ require: false });
        if (!user) {
            throw new Error(`User with this ${email} not found`);
        }
        const { attributes: { password_hash, id } } = user;
        console.log(id);
        const validPassword = await bcrypt.compare(password, password_hash);
        console.log(validPassword);
        if (!validPassword) {
            throw new IncorrectPassword('Invalid Credentials');
        }
        const userRole = Role.where({ id: id }).fetch({ withRelated: ['users'] }).then((id) => console.log(id));
        console.log(userRole);
        const { attributes: { role } } = userRole;
        return await generateAccessToken(id, role);
    }

    // static async createSession(user) {
    //     const tokenPair = await JWTService.createTokenPair(
    //         getTokenPayload(user),
    //     );
    //     if (
    //         (await user.countRefreshTokens()) <= process.env.MAX_DEVICES_AMOUNT
    //     ) {
    //         await user.createRefreshToken({ value: tokenPair.refresh });
    //     } else {
    //         const [oldRefreshToken] = await user.getRefreshTokens({
    //             order: [['updated_at', 'ASC']],
    //         });
    //         await oldRefreshToken.update({
    //             value: tokenPair.refresh,
    //         });
    //         return {
    //             user: UserService.prepareUser(user),
    //             tokenPair,
    //         };
    //     }
    // }

    // static async refreshSession(refreshTokenInstance) {
    //     const user = await refreshTokenInstance.getUser();
    //     const tokenPair = await JWTService.createTokenPair(
    //         getTokenPayload(user),
    //     );
    //     await refreshTokenInstance.update({
    //         value: tokenPair.refresh,
    //     });
    //     return {
    //         user: UserService.prepareUser(user),
    //         tokenPair,
    //     };
    // }
}

module.exports = AuthService;
