const Router = require('express');
const AuthController = require('../controllers/AuthController');
const { checkRefreshToken } = require('../middlewares/token');
const authRouter = new Router();

authRouter.post('/sign-in', AuthController.signIn);
authRouter.post('/sign-up', AuthController.signUp);
authRouter.post('/refresh', checkRefreshToken, AuthController.refreshToken);

module.exports = authRouter;
