const Router = require('express');
const { validateSignUpData, validateSignInData } = require('../middlewares/validators');
const AuthController = require('../controllers/AuthController');
// const { checkRefreshToken } = require('../middlewares/token');


const authRouter = new Router();
authRouter.post('/sign-up', validateSignUpData, AuthController.signUp);
authRouter.post('/sign-in', AuthController.signIn);
authRouter.get('/users', AuthController.getUsers);
// authRouter.post('/refresh', checkRefreshToken, AuthController.refreshToken);

module.exports = authRouter;
