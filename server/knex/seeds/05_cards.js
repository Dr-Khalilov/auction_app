'use strict';
const faker = require('faker');
const rickandmorty = require('rickmortyapi');
const { getRandomIntInclusive } = require('../utils');

exports.seed = async function (knex) {
    try {
        const rickCards = await rickandmorty.getCharacter(10);
        const generateCard = () => ({
            location_id: getRandomIntInclusive(1, 62),
            name: rickCards.name,
            species: rickCards.species,
            type_of_person: rickCards.type,
            gender: rickCards.gender,
            is_active: faker.datatype.boolean(),
            image_path: rickCards.image,
            origin: rickCards.origin,
            created_at: rickCards.created,
            updated_at: faker.date.recent(),
        });

        const generateCards = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateCard(i + 1));
        };
        await knex('cards').insert(generateCards(1));
    } catch (err) {
        console.error(err);
    }
};
