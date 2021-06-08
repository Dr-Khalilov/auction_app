const express = require('express');
const cors = require('cors');
const router = require('./routers');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(require('./handlerError'));

module.exports = app;
