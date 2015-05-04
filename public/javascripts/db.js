var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/scoreboard')

module.exports = db;