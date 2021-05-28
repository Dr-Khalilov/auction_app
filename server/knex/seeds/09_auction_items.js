const faker = require('faker');
const { getRandomIntInclusive, getRandomAuctionStatus } = require('../utils');

exports.seed = async function (knex) {
    try {
        const time = {
            max_dur_auction: `${getRandomIntInclusive(1, 3)}:${00}:${00}`,
            min_auction_time: `${00}:${getRandomIntInclusive(10, 20)}:${00}`,
        };

        const generateAuctionItem = key => ({
            user_id: getRandomIntInclusive(1, 50),
            card_id: getRandomIntInclusive(1, 10),
            description: faker.lorem.words(),
            start_date: faker.date.future(),
            auction_status: getRandomAuctionStatus(),
            actual_price: faker.finance.amount(),
            initial_rate: faker.finance.amount(100, 200),
            maximum_rate: faker.finance.amount(500, 1000),
            bet_step: faker.commerce.price(50, 100),
            max_dur_auction: time.max_dur_auction,
            min_auction_time: time.min_auction_time,
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
            bid_won_id: getRandomIntInclusive(41, 60),
        });
        const generateAuctionItems = amount => {
            return new Array(amount)
                .fill(null)
                .map((_, i) => generateAuctionItem(i + 1));
        };
        await knex('auction_items').insert(generateAuctionItems(10));
    } catch (err) {
        console.error(err);
    }
};
