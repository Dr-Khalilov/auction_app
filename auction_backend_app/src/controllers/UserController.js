const UserService = require('../services/UserService');

class UserController {
    static async getAllUsers(req, res) {
        const { body } = req;
        const users = await UserService.getAllUsers(body);
        res.send({ data: users });
    }

    static async getUser(req, res) {
        const { params: { id } } = req;
        const foundUser = await UserService.getUser(id);
        res.send({ data: foundUser });
    }

    static async deleteUser(req, res) {
        const { params: { id } } = req;
        const deletedUser = await UserService.deleteUser(id);
        console.log(deletedUser);
        res.send(deletedUser).end();
    }
}

module.exports = UserController;