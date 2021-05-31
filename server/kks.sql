DELETE FROM knex_migrations
WHERE knex_migrations."name" IN (
        '20210528161925_create_locations_table.js'
    );
    
DROP TABLE if EXISTS locations cascade;