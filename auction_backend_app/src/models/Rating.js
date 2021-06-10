const bookshelf = require('../utils/database');

const Rating = bookshelf.model('Rating', {
    tableName: 'ratings',
    user () {
        return this.belongsTo('User','user_id');
    },
});

module.exports = Rating;
