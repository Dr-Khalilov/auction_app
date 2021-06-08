const bookshelf = require('../utils/database');

const RefreshToken = bookshelf.model('RefreshToken', {
    tableName: 'refresh_tokens',
    hasTimestamps: true,

    user () {
        return this.belongsTo('User');
    },
});

module.exports = RefreshToken;
