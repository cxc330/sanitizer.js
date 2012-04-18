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
	
	mysql.query("SELECT DATE_FORMAT(creationDate,'%Y-%m-%d'), DATE_FORMAT(dueDate,'%Y-%m-%d'), task, complete FROM " + TABLE, //Select all query
	function(err, result, fields) {
		if (err) throw err;
		else {
			for (var i in result) {
				var item = result[i];
				console.log('Query result ' + i + ': ' + item.task);
				queryData.query.push({					
						'task'			: item.task,
						'creationDate'	: item["DATE_FORMAT(creationDate,'%Y-%m-%d')"], 
						'dueDate'		: item["DATE_FORMAT(dueDate,'%Y-%m-%d')"],
						'complete'		: item.complete
				});				
			}
		}
		console.log('Query complete');
		res.render('todo', {results: queryData });
	});
});

//request route
app.post('/todoRequest', function(req, res){
	processData(req.body);
	res.redirect('todo');	//redirect back to home page
});

//404 ROUTE
app.get('*', function(req, res){
	res.render('404', 404);
});

function processData(data){
	
	var newDue = $.trim(data.newDue);
	var newTask = $.trim(data.newTask);
	var set = [];
	var del = [];
	var check = [];
	
	if (newTask != '')
	{
		insertData(currentDate, "'" + newDue + "'", "'" + newTask+ "'", notComplete);
	}	
	
	for (var attribute in data) //check each data attribute
	{
		var x = 0;
		for (var result in data[attribute])
		{
			if (attribute != 'button' && attribute != 'newDue' && attribute != 'newTask')
			{				
				var propOne = $.trim(data[attribute][result]);
				var propTwo;
				
				switch(attribute)
				{
					case 'task':
					{
						if (queryData.query[x] != undefined)
						{
							propTwo = queryData.query[x].task;
							break;
						}
					}
					case 'dueDate':
					{
						propTwo = queryData.query[x].dueDate;
						break;
					}
					default:
					{
						if (attribute.indexOf("delete") > -1)
						{
							var text = attribute.replace("delete", "");
							del[x] = text;
							break;
						}
						if (attribute.indexOf("complete") > -1)
						{
							var text = attribute.replace("complete", "");
							check[text] = 1;
							break;
						}
					}
				}
				
				if (propOne == propTwo)
					console.log("No change");
				else if( attribute.indexOf("delete") == -1 && attribute.indexOf("complete") == -1)
				{				
					if (set[x] != null)
						set[x] += ", " + attribute + " = '" + propOne + "'";
					else
						set[x] = attribute + "= '" + propOne + "'";
				}
			}
			x++;
		}
	}
	
	for (var x in del)
	{
		var y = del[x];
		deleteData(queryData.query[y].creationDate, queryData.query[y].dueDate, queryData.query[y].task, queryData.query[y].complete);
	}
	for (var x = 0; x < queryData.query.length; x++)
	{
		propOne = check[x];
		propTwo = queryData.query[x].complete;
		
		if (propOne != propTwo && (propTwo != 0 || propOne != undefined))
		{
			var checkNum;
			if (propTwo == 0)
			{
				checkNum = 1;
			}
			else
			{
				checkNum = 0;
			}
			
			updateData(queryData.query[x].creationDate, queryData.query[x].dueDate, queryData.query[x].task, queryData.query[x].complete, "complete = '" + checkNum + "'");
		}
	}
	for (var x in set)
	{
		updateData(queryData.query[x].creationDate, queryData.query[x].dueDate, queryData.query[x].task, queryData.query[x].complete, set[x]);
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
	query += " AND creationDate = '" + createDate + "'";
	query += " AND dueDate = '" + dueDate + "'";
	query += " AND complete = '" + complete +"'";
	
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
	query += " AND creationDate = '" + createDate + "'";
	query += " AND dueDate = '" + dueDate + "'";
	query += " AND complete = '" + complete +"'";
	
	mysql.query(query,
		function(err, result, fields) {
			if (err) 
				throw err;
    		else 
				console.log('Deleted from DB using the following statement:\n\t "' + query + '"');
		});
}

if(process.argv[2] != null || process.argv[2] != undefined)
{
	console.log(process.argv[2]);
	app.listen(process.argv[2]);
}
else
{
	app.listen(3000);
}
