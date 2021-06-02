const bookshelf = require('../utils/database');

const Role = bookshelf.model('Role', {
    tableName: 'roles',
    users () {
        return this.belongsToMany('User');
    },
});

module.exports = Role;
