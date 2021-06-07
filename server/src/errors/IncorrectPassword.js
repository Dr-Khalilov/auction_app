const ApplicationError = require('./ApplicationError');

class IncorrectPassword extends ApplicationError {
    constructor(message) {
        super(message || 'Incorrect password', 406);
    }
}

module.exports = IncorrectPassword;