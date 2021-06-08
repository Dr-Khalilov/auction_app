const bookshelf = require('../utils/database');

const User = bookshelf.model('User', {
        tableName: 'users',
        hasTimestamps: true,
        hidden: ['password_hash'],

        roles() {
            return this.belongsToMany('Role','roles_users');
        },

        refreshTokens() {
            return this.hasMany('RefreshToken');
        },

        transactions() {
            return this.hasMany('Transaction');
        },

        ratings() {
            return this.hasMany('Rating');
        },

        chats() {
            return this.hasMany('Chat');
        },

        auction_items() {
            return this.belongsTo('Auction_Item');
        },
    },
);

module.exports = User;
