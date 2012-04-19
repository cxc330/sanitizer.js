var _mysql = require('mysql');
var login = require('./login');
var mysql;
exports.MYSQL_USER = login.user;
exports.MYSQL_PASS = login.pw;
exports.DATABASE = 'todo';
exports.TABLE = 'toDoList';
exports.currentDate = "CURDATE()";

exports.mySqlStart = function(){
	mysql = _mysql.createClient({
				user: exports.MYSQL_USER,
				password: exports.MYSQL_PASS,
			});
	
	mysql.query('use ' + exports.DATABASE);
	return mysql;
}

exports.insertData = function (createDate, dueDate, task, complete){
	
	var query = "INSERT INTO " + exports.TABLE + " (creationDate, dueDate, task, complete)";
	query += " VALUES (" + createDate + ", " + dueDate + ", " + task + ", " + complete +")";
	
	mysql.query(query,
		function(err, result, fields) {
			if (err) 
				console.log(err);
    		else 
				console.log('Inserted into DB using the following statement:\n\t "' + query + '"');
		});
}

exports.updateData = function(createDate, dueDate, task, complete, set)
{
	var query = "UPDATE " + exports.TABLE + " SET " + set + " WHERE task = '" + task + "'";
	query += " AND creationDate = '" + createDate + "'";
	query += " AND dueDate = '" + dueDate + "'";
	query += " AND complete = '" + complete +"'";
	
	mysql.query(query,
		function(err, result, fields) {
			if (err) 
				console.log(err);
    		else 
				console.log('Updated DB using the following statement:\n\t "' + query + '"');
		});
}
	
exports.deleteData = function(createDate, dueDate, task, complete)
{
	var query = "DELETE FROM " + exports.TABLE + " WHERE task = '" + task + "'";
	query += " AND creationDate = '" + createDate + "'";
	query += " AND dueDate = '" + dueDate + "'";
	query += " AND complete = '" + complete +"'";
	
	mysql.query(query,
		function(err, result, fields) {
			if (err) 
				console.log(err);
    		else 
				console.log('Deleted from DB using the following statement:\n\t "' + query + '"');
		});
}