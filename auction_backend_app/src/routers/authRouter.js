const Router = require('express');
const { hashPassword } = require('../middlewares/hashPassword');
const { validateSignUpData } = require('../middlewares/validators');
const AuthController = require('../controllers/AuthController');
// const { checkRefreshToken } = require('../middlewares/token');


const authRouter = new Router();
authRouter.post('/sign-in', AuthController.signIn);
authRouter.post('/sign-up', validateSignUpData, hashPassword, AuthController.signUp);
authRouter.get('/users', AuthController.getUsers);
// authRouter.post('/refresh', checkRefreshToken, AuthController.refreshToken);

module.exports = authRouter;
