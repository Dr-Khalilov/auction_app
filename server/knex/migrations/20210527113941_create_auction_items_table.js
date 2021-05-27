'use strict';
exports.up = async function (knex, Promise) {
    await knex.schema.createTable('auction_items', function (table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('cascade')
            .onDelete('cascade');
        table
            .integer('bid_won_id')
            .unsigned()
            .references('id')
            .inTable('bids')
            .onUpdate('cascade')
            .onDelete('cascade');
        table
            .integer('card_id')
            .unsigned()
            .references('id')
            .inTable('cards')
            .onUpdate('cascade')
            .onDelete('cascade');
        table.string('description').notNullable();
        table.datetime('start_date').notNullable();
        table.string('auction_status').notNullable();
        table.decimal('actual_price', 10, 2).notNullable();
        table.decimal('initial_rate', 10, 2).notNullable();
        table.decimal('maximum_rate', 10, 2).notNullable();
        table.decimal('bet_step', 10, 2).notNullable();
        table.time('max_dur_auction').notNullable();
        table.time('min_auction_time').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
    await knex.schema.createTable('bids', function (table) {
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
    return knex.schema.dropTable('auction_items');
};
