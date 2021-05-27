'use strict';
const faker = require('faker');

exports.seed = async function (knex) {
    try {
        const generateUser = key => ({
            name: faker.name.firstName(),
            sur_name: faker.name.lastName(),
            login: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            created_at: faker.date.past(),
            last_visit_date: faker.date.recent(),
            updated_at: faker.date.recent(),
        });

        const generateUsers = (amount) => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateUser(i + 1));
        };

        await knex('users').insert(generateUsers(50));
    } catch (err) {
        console.error(err);
    }
};
