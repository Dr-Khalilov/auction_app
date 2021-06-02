const http = require('http');
const express = require('express');
const authRouter = require('./routers/authRouter');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/auth', authRouter);
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`APP started on port ${PORT}`);
});
