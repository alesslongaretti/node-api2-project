const express = require('express');

const postsRouter = require('./data/posts/posts-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h1>BLOG POSTS </h1>`)
});

module.exports = server;