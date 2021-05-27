'use strict';
exports.up = function (knex, Promise) {
    return knex.schema.createTable('cards_sets', function (table) {
        table.integer('card_id').unsigned();
        table
            .foreign('card_id')
            .references('id')
            .inTable('cards')
            .onUpdate('cascade')
            .onDelete('cascade');
        table.integer('set_id').unsigned();
        table
            .foreign('set_id')
            .references('id')
            .inTable('set_of_cards')
            .onUpdate('cascade')
            .onDelete('cascade');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cards_sets');
};
