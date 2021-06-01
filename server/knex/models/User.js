const bookshelf = require('../utils/database');

const User = bookshelf.model('User', {
    tableName: 'users',
    hasTimestamps: true,

    transactions () {
        return this.hasMany('Transaction');
    },

    ratings () {
        return this.hasMany('Rating');
    },

    chats () {
        return this.hasMany('Chat');
    },

    auction_items () {
        return this.belongsTo('Auction_Item');
    },

    findAll: function (filter, options) {
        return this.forge()
            .where(filter)
            .fetchAll(options);
    },

    findOne: function (query, options) {
        return this.forge(query).fetch(options);
    },

    create: function (data, options) {
        return this.forge(data).save(null, options);
    },
});

module.exports = User;
