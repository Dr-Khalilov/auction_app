const Router = require('express');
const { check } = require('express-validator');
const { validateSignUpData } = require('../middlewares/validators');
const AuthController = require('../controllers/AuthController');
// const { checkRefreshToken } = require('../middlewares/token');


const authRouter = new Router();
authRouter.post('/sign-in', AuthController.signIn);
authRouter.post('/sign-up', validateSignUpData, AuthController.signUp);
authRouter.get('/users', AuthController.getUsers);
// authRouter.post('/refresh', checkRefreshToken, AuthController.refreshToken);

module.exports = authRouter;
