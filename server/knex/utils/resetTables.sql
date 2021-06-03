DELETE FROM knex_migrations
WHERE knex_migrations."name" IN (
        '20210527101838_create_users_table.js'
    );
    
DROP TABLE if EXISTS users cascade;
TRUNCATE TABLE cards_episodes;