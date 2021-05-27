exports.up = function (knex, Promise) {
    return knex.schema.createTable('transactions', function (table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users');
        table.decimal('card_points', 10, 2).notNullable();
        table.string('type').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('transactions');
};
