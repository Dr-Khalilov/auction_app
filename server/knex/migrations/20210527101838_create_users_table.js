exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('name', 128).notNullable();
        table.string('sur_name', 128).notNullable();
        table.string('login', 30).notNullable();
        table
            .string('email', 50)
            .unique()
            .notNullable();
        table.text('password').notNullable();
        table
            .date('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
        table.date('last_visit_date').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
