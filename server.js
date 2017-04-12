/**
 * Created by buwan on 4/12/2017.
 */
// ---------------------------------------------------------------------------------------------------------------------
// set up
// ---------------------------------------------------------------------------------------------------------------------

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

// ---------------------------------------------------------------------------------------------------------------------
// configurations
// ---------------------------------------------------------------------------------------------------------------------

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.listen(4400);
console.log("App listening on port 4400");

// ---------------------------------------------------------------------------------------------------------------------
// main routing
// ---------------------------------------------------------------------------------------------------------------------

app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
});