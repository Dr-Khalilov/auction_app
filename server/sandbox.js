const querystring = require('querystring');
const axios = require('axios');
const rickandmorty = require('rickmortyapi');

const baseURL = 'https://rickandmortyapi.com/api';

// axios.get(baseURL).then(data => console.log(data));

// async function getLocation () {
//     try {
//         const response = await axios.get(baseURL, '/location/1');
//         console.log(response);
//     } catch (err) {
//         console.error(err);
//     }
// }

const getLocation = async () => {
    try {
        const rick = await rickandmorty.getLocation(
            Array.from({ length: 108 }, (v, i) => i + 1)
        );
        const arr = [...rick];

       console.log(typeof arr);
    } catch (err) {
        console.error(err);
    }
};

getLocation();
