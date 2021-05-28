exports.up = function (knex, Promise) {
    return knex.schema.alterTable('auction_items', function (table) {
        table
            .integer('bid_won_id')
            .unsigned()
            .references('id')
            .inTable('bids')
            .nullable()
            .onUpdate('cascade')
            .onDelete('SET NULL');
    });
};

exports.down = function (knex, Promise) {};
