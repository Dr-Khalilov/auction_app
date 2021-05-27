'use strict';
exports.up = async function (knex, Promise) {
    return await knex.schema.createTable('bids', function (table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('cascade')
            .onDelete('cascade');
        table
            .integer('auction_item_id')
            .unsigned()
            .references('id')
            .inTable('auction_items')
            .onUpdate('cascade')
            .onDelete('cascade');
        table.decimal('amount', 10, 2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('bids');
};
