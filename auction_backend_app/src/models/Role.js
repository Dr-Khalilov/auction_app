const bookshelf = require('../utils/database');

const Role = bookshelf.model('Role', {
    tableName: 'roles',
    users() {
        return this.belongsToMany('User', 'roles_users', 'user_id', 'role_id');
    },
});

module.exports = Role;
