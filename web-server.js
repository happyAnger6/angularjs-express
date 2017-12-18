var express = require("express"),
 app = express(),
 port = parseInt(process.env.Port, 10) || 8999;
var bodyParser = require('body-parser');

var router = require('./app/routes/index');
var router_example1 = require('./app/routes/example1');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));
app.use('/', router);
app.use('/example1', router_example1);

app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');
