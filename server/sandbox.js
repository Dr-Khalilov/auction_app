const querystring = require('querystring');
const axios = require('axios');
const config = require('./config/api.json');

const baseURL = 'https://rickandmortyapi.com/api/character';

axios.get(baseURL).then(data => console.log(data));
