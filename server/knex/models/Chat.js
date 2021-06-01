const bookshelf = require('../utils/database');

const Chat = bookshelf.model('Chat', {
    tableName: 'chats',
    user () {
        return this.belongsTo('User');
    },
});

module.exports = Chat;
