'use strict';
exports.up = function (knex, Promise) {
    return knex.schema.createTable('chats', function (table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .nullable()
            .onUpdate('cascade')
            .onDelete('SET NULL');
        table.string('text').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('chats');
};
