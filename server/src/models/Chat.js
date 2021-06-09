const bookshelf = require('../utils/database');

const Chat = bookshelf.model('Chat', {
    tableName: 'chats',
    user () {
        return this.belongsTo('User','user_id');
    },
});

module.exports = Chat;
