const ApplicationError = require('./ApplicationError');

class TokenError extends ApplicationError {
    constructor(err) {
        super(err.message || 'Token error', 419);
    }
}

module.exports = TokenError;