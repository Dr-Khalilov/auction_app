'use strict';
const rickandmorty = require('rickmortyapi');

exports.seed = async function (knex) {
    try {
        const rickEpisode = await rickandmorty.getEpisode(5);
        const insertEpisode = () => ({
            name: rickEpisode.name,
            air_date: rickEpisode.air_date,
            episode: rickEpisode.episode,
            created_at: rickEpisode.created,
        });
        const insertEpisodes = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => insertEpisode(i + 1));
        };
        await knex('episodes').insert(insertEpisodes(1));
    } catch (err) {
        console.error(err);
    }
};
