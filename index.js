//use path module
const path = require('path');
//connection file 
//use express module
const express = require('express');
//use bodyParser middleware
const bodyParser = require('body-parser');
const app = express();
//Create Connection
//set views file
app.set('views',path.join(__dirname,'views'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set view engine
app.use('/assets',express.static(__dirname + '/public'));
//app.use('/upload',express.static(__dirname + '/public'));
app.use(express.static('./views'));
app.set('view engine', 'hbs');
//const conn = require('./include/db.js');
const router = require('./server.js');
app.use(router);
app.listen(8000);
