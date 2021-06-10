const User = require('../models/User');
const UserNotFoundError = require('../errors/UserNotFoundError');

class UserService {
    static async getAllUsers({ query }) {
        const users = await User.fetchAll({
            ...query,
        });
        if (!users) {
            throw new Error('Users not found');
        }
        return users;
    }

    static async getUser(id) {
        const user = await User.forge({ id });
        console.log(user);
        if (!user) {
            return new UserNotFoundError('User not found');
        }
        return user;

    }

    static async deleteUser(id) {
        const count = await User({ id }).destroy({ require: true });
        if (count === 0) {
            return new UserNotFoundError('User not found');
        }
        return count;
    }

}

module.exports = UserService;