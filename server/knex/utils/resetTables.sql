DELETE FROM knex_migrations
WHERE knex_migrations."name" IN (
        '20210528163641_createCardsEpisodesTable.js'
    );
    
DROP TABLE if EXISTS users cascade;
TRUNCATE TABLE cards_episodes;
ALTER TABLE episodes DROP COLUMN cards;
TRUNCATE TABLE locations;
DROP TABLE locations;
DROP DATABASE auction_db;