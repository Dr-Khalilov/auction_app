const bookshelf = require('../knex/utils/database');

const Transaction = bookshelf.model('Transaction', {
    tableName: 'transactions',
    user () {
        return this.belongsTo('User');
    },
});

module.exports = Transaction;
