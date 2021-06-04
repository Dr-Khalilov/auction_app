'use strict';

const { getCharacter } = require('rickmortyapi');

exports.seed = async function(knex) {
    try {
        const cards = await getCharacter(Array.from({ length: 671 }, (v, i) => i + 1));
        const insertCardsEpisodesIds = () => {
            const cardEpisodeIds = [];
            for (let i = 0; i < cards.length; i++) {
                for (let j = 0; j < cards[i].episode.length; j++) {
                    cardEpisodeIds.push({
                        card_id: cards[i].id,
                        episode_id: cards[i].episode[j].split('/')[5],
                    });
                }
            }
            cardEpisodeIds.forEach((item, index) => console.log(item, index));
            return cardEpisodeIds;
        };

        await knex('cards_episodes').insert(insertCardsEpisodesIds());
    } catch (err) {
        console.error(err);
    }
};
