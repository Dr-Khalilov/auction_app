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
// bookshelf.plugin('registry');
// bookshelf.plugin('visibility');

module.exports = bookshelf;
