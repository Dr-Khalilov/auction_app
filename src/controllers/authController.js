const User = require('../models/User');



class authController {
    async registration (req, res) {
        try {
            const {
                body: { username, password },
            } = req;
            const candidate = User.findOne
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async login (req, res) {
        try {
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async getUsers (req, res) {
        try {
            res.json('server work');
        } catch (err) {
            console.log(err);
            res.status(400).json({ message });
        }
    }
}

module.exports = new authController();
