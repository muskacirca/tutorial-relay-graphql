import express from 'express'

const server_port = 3000

var app = express();

app.use('/', (req, res) => {
    res.send('Hello World')
})

app.listen(server_port, (err) => {
    if(err) return console.log(err)
    console.log('Server is now running on port ' + server_port);
})
