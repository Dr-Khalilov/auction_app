exports.up = function (knex, Promise) {
    return knex.schema.alterTable('auction_items', function (table) {
        table
            .integer('bid_won_id')
            .unsigned()
            .references('id')
            .inTable('bids')
            .onUpdate('cascade')
            .onDelete('cascade');
    });
};

exports.down = function (knex, Promise) {};
