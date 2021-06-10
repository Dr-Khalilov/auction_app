const authRouter = require('express').Router();
const { validateSignUpData, validateSignInData } = require('../middlewares/validators');
const AuthController = require('../controllers/AuthController');
const userRouter = require('./userRouter');
// const { checkRefreshToken } = require('../middlewares/token');


authRouter.post('/sign-up', validateSignUpData, AuthController.signUp);
authRouter.post('/sign-in', validateSignInData, AuthController.signIn);
authRouter.use('/users', userRouter);
// authRouter.post('/refresh', checkRefreshToken, AuthController.refreshToken);

module.exports = authRouter;
