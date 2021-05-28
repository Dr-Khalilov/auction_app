DELETE FROM knex_migrations
WHERE knex_migrations."name" IN (
        '20210527113941_create_auction_items_table.js',
        '20210527120444_create_bids_table.js'
    ) ;
    
    DROP TABLE if EXISTS bids cascade;