const Router = require('express');
const { check } = require('express-validator');
const AuthController = require('../controllers/AuthController');
// const { checkRefreshToken } = require('../middlewares/token');

const authRouter = new Router();
// authRouter.post('/sign-in', AuthController.signIn);
authRouter.post('/sign-up', [check('name', 'Name cannot be empty').notEmpty(),
    check('sur_name', 'Surname cannot be empty').notEmpty(),
    check('login', 'Login cannot be empty').notEmpty(),
    check('password_hash', 'Password must be more 8 and less 32 chars').isLength({
        min: 8,
        max: 32,
    })], AuthController.signUp);
authRouter.get('/users', AuthController.getUsers);
// authRouter.post('/refresh', checkRefreshToken, AuthController.refreshToken);

module.exports = authRouter;
