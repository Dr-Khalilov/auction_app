const userRouter = require('express').Router({ mergeParams: true });
const UserController = require('../controllers/UserController');
const paginate = require('../middlewares/paginate');
const authUser = require('../middlewares/authMiddleware');
const roleUser = require('../middlewares/roleMiddleware');


userRouter.get('/', authUser, UserController.getAllUsers);
userRouter.route('/:userId').get(UserController.getUser).delete(UserController.deleteUser);

module.exports = userRouter;