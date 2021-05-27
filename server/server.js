const http = require('http')
const express = require('express')
const PORT = process.env.PORT || 3000;
const knex = require('./knex/knex');

const app = express();
const server = http.createServer(app)

server.listen(PORT, ()=>{
    console.log(`APP started on port ${PORT}`);
})

