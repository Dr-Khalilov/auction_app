'use strict';
const faker = require('faker');
const { getCharacter, getLocation, getEpisode } = require('rickmortyapi');

exports.seed = async function(knex) {
    try {
        const locations = await getLocation(Array.from({ length: 108 }, (v, i) => i + 1));
        const cards = await getCharacter(Array.from({ length: 671 }, (v, i) => i + 1));


        const insertAllCards = () => {
            const addCards = [];
            for (let card of cards) {
                addCards.push({
                    location_id: card.location.url.split('/')[5],
                    name: card.name,
                    status: card.status,
                    species: card.species,
                    type_of_person: card.type,
                    gender: card.gender,
                    is_active: faker.datatype.boolean(),
                    image_path: card.image,
                    origin: card.origin,
                    created_at: card.created,
                    updated_at: faker.date.recent(),
                });
            }
            return addCards;
        };
        // console.log(insertAllCards());
        await knex.batchInsert('cards', insertAllCards());
    } catch (err) {
        console.error(err);
    }
};
