'use strict';
exports.up = function (knex, Promise) {
    return knex.schema.createTable('cards_sets', function (table) {
        table.integer('card_id').unsigned();
        table
            .foreign('card_id')
            .references('id')
            .inTable('cards')
            .nullable()
            .onUpdate('cascade')
            .onDelete('SET NULL');
        table.integer('set_id').unsigned();
        table
            .foreign('set_id')
            .references('id')
            .inTable('set_of_cards')
            .nullable()
            .onUpdate('cascade')
            .onDelete('SET NULL');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cards_sets');
};
