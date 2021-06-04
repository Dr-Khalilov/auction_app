'use strict';
const faker = require('faker');
const { getCharacter, getLocation, getEpisode } = require('rickmortyapi');
const { getRandomIntInclusive } = require('../utils');

exports.seed = async function(knex) {
    try {
        const locations = await getLocation(Array.from({ length: 108 }, (v, i) => i + 1));
        const cards = await getCharacter(Array.from({ length: 671 }, (v, i) => i + 1));

        const getIds = () => {
            const itemId = [];
            for (let card of cards) {
                for (let location of locations) {
                    if (card.location.name === location.name) {
                        itemId.push({ location_id: location.id });
                    }
                }
            }
            return itemId;
        };

        console.log(getIds());

        const insertAllCards = () => {
            const addCards = [];
            let card;
            for (let instance of cards) {
                for (let location of locations) {
                    addCards.push({
                            location_id: it,
                            name: instance.name,
                            status: instance.status,
                            species: instance.species,
                            type_of_person: instance.type,
                            gender: instance.gender,
                            is_active: faker.datatype.boolean(),
                            image_path: instance.image,
                            origin: instance.origin,
                            created_at: instance.created,
                            updated_at: faker.date.recent(),
                        },
                    );
                }
            }
            return addCards;
        };

        // await knex.batchInsert('cards', insertAllCards());
    } catch (err) {
        console.error(err);
    }
};
