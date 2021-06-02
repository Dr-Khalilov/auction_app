'use strict';
const faker = require('faker');
const rickandmorty = require('rickmortyapi');
const { getRandomIntInclusive } = require('../utils');

exports.seed = async function (knex) {
    try {
        const rickCards = await rickandmorty.getCharacter(
            Array.from({ length: 671 }, (v, i) => i + 1)
        );
        const insertAllCards = () => {
            const addCards = [];
            let card;
            for (let instance of rickCards) {
                card = {
                    location_id: getRandomIntInclusive(74, 181),
                    name: instance.name,
                    species: instance.species,
                    type_of_person: instance.type,
                    gender: instance.gender,
                    is_active: faker.datatype.boolean(),
                    image_path: instance.image,
                    origin: instance.origin,
                    created_at: instance.created,
                    updated_at: faker.date.recent(),
                };
                addCards.push(card);
            }
            return addCards;
        };

        await knex('cards').insert(insertAllCards());
    } catch (err) {
        console.error(err);
    }
};
