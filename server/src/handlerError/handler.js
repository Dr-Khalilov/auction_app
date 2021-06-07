const express_async_errors = require('express-async-errors');

module.exports = errorHandler = async (err, req, res, next) => {
    console.log('LOG ERROR =>', err);
    if (err.message || err.status) {
        res.status(err.status).send(err.message);
    } else {
        res.status(500).send('Server Error');
    }
};


