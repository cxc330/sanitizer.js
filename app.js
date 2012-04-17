var _mysql = require('mysql');
var express = require('express');
app = express.createServer();
var mysql;
var mysqlConfig = require('./mysqlConfig');
var queryData;
var currentDate = "CURDATE()";
var notComplete = 0;
var $ = require('jquery');

app.configure(function(){
	app.use(express.static(__dirname + '/static')); //static file serving
	app.use(express.bodyParser()); //post data parsing
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});

var fs = require("fs");

var MYSQL_USER = 'root';
var MYSQL_PASS = 'password';
var DATABASE = 'todo';
var TABLE = 'toDoList';

function mySqlStart(){
	mysql = _mysql.createClient({
		user: MYSQL_USER,
		password: MYSQL_PASS,
	});
	
	mysql.query('use ' + DATABASE);
}

mySqlStart();

//Default route
app.get('/todo', function(req, res){
	queryData = {query:[]};
	
	mysql.query('select * from ' + TABLE, //Select all query
	function(err, result, fields) {
		if (err) throw err;
		else {
			for (var i in result) {
				var item = result[i];
				console.log('Query result ' + i + ': ' + item.task);
				queryData.query.push({					
						'task'			: item.task,
						'creationDate'	: item.creationDate, 
						'dueDate'		: item.dueDate,
						'complete'		: item.complete
				});				
			}
		}
		console.log('Query complete');
		res.render('todo', {results: queryData });
	});
});

app.post('/todoRequest', function(req, res){
	processData(req.body);
	res.redirect('todo');	//redirect back to home page
});

//404 ROUTE
app.get('*', function(req, res){
	res.render('404', 404);
});

function processData(data){
	console.log(data);
	
	var newDue = $.trim(data.newDue);
	var newTask = $.trim(data.newTask);
	
	if (newTask != '')
	{
		insertData(currentDate, "'" + newDue + "'", "'" + newTask+ "'", notComplete);
	}	
	
	for (var attribute in data) //check each data attribute
	{
		console.log(attribute + ": " + data[attribute]);
		var propOne = data[attribute];
		var propTwo = queryData.query[0].dueDate;
		if (propOne == propTwo)
			console.log("No change");
		else
			console.log("change between " + propOne + " and " + propTwo);
	}
}

function insertData (createDate, dueDate, task, complete){
	
	var query = "INSERT INTO " + TABLE + " (creationDate, dueDate, task, complete)";
	query += " VALUES (" + createDate + ", " + dueDate + ", " + task + ", " + complete +")";
	
	mysql.query(query,
		function(err, result, fields) {
			if (err) 
				throw err;
    		else 
				console.log('Inserted into DB using the following statement:\n\t "' + query + '"');
		});
}

function updateData(createDate, dueDate, task, complete, set)
{
	var query = "UPDATE " + TABLE + " SET " + set + " WHERE task = '" + task + "'";
	query += "AND creationDate = '" + createDate + "'";
	query += "AND dueDate = '" + dueDate + "'";
	query += "AND complete = '" + complete +"'";
	
	mysql.query(query,
		function(err, result, fields) {
			if (err) 
				throw err;
    		else 
				console.log('Updated DB using the following statement:\n\t "' + query + '"');
		});
}
	
function deleteData (createDate, dueDate, task, complete)
{
	var query = "DELETE FROM " + TABLE + " WHERE task = '" + task + "'";
	query += "AND creationDate = '" + createDate + "'";
	query += "AND dueDate = '" + dueDate + "'";
	query += "AND complete = '" + complete +"'";
	
	mysql.query(query,
		function(err, result, fields) {
			if (err) 
				throw err;
    		else 
				console.log('Deleted from DB using the following statement:\n\t "' + query + '"');
		});
}

app.listen(3000);
