'use strict';
exports.up = function (knex, Promise) {
    return knex.schema.createTable('cards', function (table) {
        table.increments('id').primary();
        table.string('name', 50).notNullable();
        table.string('episode').notNullable();
        table.text('location').notNullable();
        table.string('type_of_person').notNullable();
        table
            .boolean('is_active')
            .defaultTo(false)
            .notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cards');
};
