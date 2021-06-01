'use strict';
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'auction_db',
        charset: 'utf8',
    },
});

const bookshelf = require('bookshelf')(knex);

const User = bookshelf.model('User', {
    tableName: 'users',
    transactions () {
        return this.hasMany(Transactions);
    },
    ratings () {
        return this.hasMany(Ratings);
    },
    chats () {
        return this.hasMany(Chats);
    },
    auction_items () {
        return this.belongsTo(Auction_Items);
    },
});

const Transaction = bookshelf.model('Transaction', {
    tableName: 'transactions',
});

const Rating = bookshelf.model('Rating', {
    tableName: 'ratings',
});

const Chat = bookshelf.model('Chat', {
    tableName: 'chats',
});


module.exports = require('bookshelf')(knex);
