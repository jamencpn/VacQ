const mysql = require("mysql");
var sql_config = require('./sql_config')

var connection = mysql.createPool({
    host : sql_config.host,
    user : sql_config.user,
    password : sql_config.password,
    database : sql_config.database,
});

module.exports = connection;