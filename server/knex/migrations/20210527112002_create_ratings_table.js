'use strict';
exports.up = function (knex, Promise) {
    return knex.schema.createTable('ratings', function (table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .nullable()
            .onUpdate('cascade')
            .onDelete('SET NULL');
        table.decimal('point', 10, 2).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('ratings');
};
