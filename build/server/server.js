'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server_port = 3000;

var app = (0, _express2.default)();

app.get('/', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, "../../src/frontend/index.html"));
});

app.get('/bundle.js', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, "../../public/bundle.js"));
});

app.listen(server_port, function (err) {
    if (err) return console.log(err);
    console.log('Server is now running on port ' + server_port);
});