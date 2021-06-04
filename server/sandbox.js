const { getCharacter, getEndpoints, getLocation, getEpisode } = require('rickmortyapi');

async function getCorrectCards() {
    const locations = await getLocation(Array.from({ length: 108 }, (v, i) => i + 1));
    const cards = await getCharacter(Array.from({ length: 671 }, (v, i) => i + 1));
    const earthC137 = [];
    for (let card of cards) {
        for (let location of locations) {
            if (card.location.name === location.name) {
                earthC137.push({ location_id: location.id});
            }
        }
    }
    return earthC137;
}
