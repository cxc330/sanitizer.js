var _mysql = require('mysql');
var express = require('express');
app = express.createServer();
var mysql;
var mysqlConfig = require('./mysqlConfig');

app.configure(function(){
	app.use(express.logger());
	app.use(express.static(__dirname + '/static'));
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

//mySqlStart();

//Default route
app.get('/', function(req, res){
	res.render('todo');
});

//404 ROUTE
app.get('*', function(req, res){
  res.render('404', 404);
});
/*
app.get('/todo', function(req, res, next){
	console.log("something");
	fs.createWriteStream("todo/index.html", {
    		flags: "a",
    		encoding: "encoding",
    		mode: 0666
	}).write("appended text\n");
	console.log('todo request');
	
});
/*
app.post('/todoRequest', function(req, res){
	var response = {query:[{}]};
	
  	mysql.query('select * from ' + TABLE,
	function(err, result, fields) {
		if (err) throw err;
		else {
			for (var i in result) {
				var item = result[i];
				console.log('Query result ' + i + ': ' + item.task);
				response.query.push({
						/*creationDate	: item.creationDate, 
						dueDate			: item.dueDate,
						task			: item.task
				});
				console.log(response.query[1].task);
			}
		}
		console.log('Query complete');
	});
	
	console.log(response.query);
	res.send(response);
});*/


app.listen(3000);
