const ApplicationError = require('./ApplicationError');

class UserAlreadyExistError extends ApplicationError {
    constructor(message) {
        super(message || 'User with this email already exist', 406);
    }
}

module.exports = UserAlreadyExistError;