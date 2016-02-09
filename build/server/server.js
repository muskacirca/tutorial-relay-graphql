'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server_port = 3000;

var app = (0, _express2.default)();

app.use('/', function (req, res) {
    res.send('Hello World');
});

app.listen(server_port, function (err) {
    if (err) return console.log(err);
    console.log('Server is now running on port ' + server_port);
});