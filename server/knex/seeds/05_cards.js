'use strict';
const faker = require('faker');

exports.seed = async function (knex) {
    try {
        const generateCard = key => ({
            name: faker.name.title(),
            episode: faker.lorem.sentence(),
            location: faker.address.cityName(),
            type_of_person: faker.name.gender(),
            is_active: faker.datatype.boolean(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
        });

        const generateCards = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateCard(i + 1));
        };
        await knex('cards').insert(generateCards(10));
    } catch (err) {
        console.error(err);
    }
};
