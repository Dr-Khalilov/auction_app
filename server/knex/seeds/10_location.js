'use strict';
const rickandmorty = require('rickmortyapi');

exports.seed = async function (knex) {
    try {
        let rickLocation = await rickandmorty.getLocation(1);
        const generateLocation = () => ({
            name: rickLocation.name,
            type: rickLocation.type,
            dimension: rickLocation.dimension,
            residents: rickLocation.residents,
            created_at: rickLocation.created,
        });

        const generateLocations = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateLocation(i + 1));
        };
        await knex('locations').insert(generateLocations(10));
    } catch (err) {
        console.error(err);
    }
};
