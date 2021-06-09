const bookshelf = require('../utils/database');

const Role_User = bookshelf.model('Role_User', {
    tableName: 'roles_users',

});

module.exports = Role_User;