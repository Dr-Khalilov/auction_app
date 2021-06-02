'use strict';
exports.seed = async function (knex) {
    try {
        let users = await knex
            .from('users')
            .pluck('id')
            .then(id => id);
        let roles = await knex
            .from('roles')
            .pluck('id')
            .then(id => id);

        const generateRoleUser = key => ({
            user_id: users[key],
            role_id: roles[key],
        });

        const generateRolesUsers = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateRoleUser(i));
        };
        await knex('roles_users').insert(generateRolesUsers(100));
    } catch (err) {
        console.error(err);
    }
};
