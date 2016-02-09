import express from 'express'
import path from 'path'

var {Schema} = require('./data/schema');
var graphQLHTTP = require('express-graphql');

const server_port = 3000

var app = express();

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../src/frontend/index.html"));
})

app.get('/bundle.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../public/bundle.js"));
})

app.use('/graphql', graphQLHTTP({ schema: Schema, pretty: true, graphiql: true}));

app.listen(server_port, (err) => {
    if(err) return console.log(err)
    console.log('Server is now running on port ' + server_port);
})
