// 连接数据库
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql_001'
});

connection.connect();

module.exports = connection;