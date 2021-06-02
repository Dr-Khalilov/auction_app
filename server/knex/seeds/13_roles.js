'use strict';
exports.seed = async function (knex) {
    try {
        const generateRole = key => ({
            created_at: new Date(),
            updated_at: new Date(),
        });
        const generateRoles = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateRole(i + 1));
        };
        await knex('roles').insert(generateRoles(98));
    } catch (err) {
        console.error(err);
    }
};
