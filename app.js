var _mysql = require('mysql');

var MYSQL_USER = 'root';
var MYSQL_PASS = 'password';
var DATABASE = 'todo';
var TABLE = 'gadgets';

var mysql = _mysql.createClient({
    user: MYSQL_USER,
    password: MYSQL_PASS,
});

mysql.query('use ' + DATABASE);

mysql.query('select * from helloWorld',
function(err, result, fields) {
    if (err) throw err;
    else {
        for (var i in result) {
            var item = result[i];
            console.log('Query result ' + i + ': ' + item.text);
        }
    }
    console.log('Query complete');
});
