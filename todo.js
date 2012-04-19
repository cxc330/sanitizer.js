var express = require('express');
var app = express.createServer();
var mysqlConfig = require('./mysqlConfig');
var sanitizer = require('./sanitizer');
var mysql;
var queryData;
var notComplete = 0;
var $ = require('jquery');

/*
*EXPRESS SETTINGS
*/
app.configure(function(){
	app.use(express.static(__dirname + '/static')); //static file serving
	app.use(express.bodyParser()); //post data parsing
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});
/*
*EXPRESS SETTINGS END
*/

mysql = mysqlConfig.mySqlStart();

//Default route
app.get('/todo', function(req, res){
	queryData = {query:[]};
	
	mysql.query("SELECT DATE_FORMAT(creationDate,'%Y-%m-%d'), DATE_FORMAT(dueDate,'%Y-%m-%d'), task, complete FROM " + mysqlConfig.TABLE, //Select all query
	function(err, result, fields) {
		if (err) 
			console.log(err);
		else {
			for (var i in result) {
				var item = result[i];
				console.log('Query result ' + i + ': ' + item.task);
				queryData.query.push({					
						'task'			: sanitizer.encodeUnescape(item.task),
						'creationDate'	: item["DATE_FORMAT(creationDate,'%Y-%m-%d')"], 
						'dueDate'		: item["DATE_FORMAT(dueDate,'%Y-%m-%d')"],
						'complete'		: sanitizer.encodeUnescape(item.complete)
				});				
			}
		}
		console.log('Query complete');
		res.render('todo', {results: queryData });
	});
});

//request route
app.post('/todoRequest', function(req, res){
	if (queryData != undefined)
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
		mysqlConfig.insertData(mysqlConfig.currentDate, "'" + newDue + "'", "'" + sanitizer.encodeEscape(newTask) + "'", notComplete);
	}	
	
	for (var attribute in data) //check each data attribute
	{
		var x = 0;
		if (isArray(data[attribute]))
		{
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
					
					propOne = sanitizer.encodeEscape(propOne);
					propTwo = sanitizer.encodeEscape(propTwo);
					
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
		else if (attribute != 'button' && attribute != 'newDue' && attribute != 'newTask')
		{
		  var propOne = $.trim(data[attribute]);
		  var propTwo;
		  switch(attribute)
		  {
			  case 'task':
			  {
					  propTwo = queryData.query[0].task;
					  break;
			  }
			  case 'dueDate':
			  {
				  propTwo = queryData.query[0].dueDate;
				  break;
			  }
			  default:
			  {
				  if (attribute.indexOf("delete") > -1)
				  {
					  var text = attribute.replace("delete", "");
					  del[0] = text;
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
			
			propOne = sanitizer.encodeEscape(propOne);
			propTwo = sanitizer.encodeEscape(propTwo);
			
			if (propOne == propTwo)
				console.log("No change");
			else if( attribute.indexOf("delete") == -1 && attribute.indexOf("complete") == -1)
			{				
				if (set[0] != null)
					set[0] += ", " + attribute + " = '" + propOne + "'";
				else
					set[0] = attribute + "= '" + propOne + "'";
			}
		}
	}
	
	for (var x in del)
	{
		var y = del[x];
		mysqlConfig.deleteData(queryData.query[y].creationDate, queryData.query[y].dueDate, sanitizer.encodeEscape(queryData.query[y].task), queryData.query[y].complete);
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
			
			mysqlConfig.updateData(queryData.query[x].creationDate, queryData.query[x].dueDate, sanitizer.encodeEscape(queryData.query[x].task), queryData.query[x].complete, "complete = '" + checkNum + "'");
		}
	}
	for (var x in set)
	{
		mysqlConfig.updateData(queryData.query[x].creationDate, queryData.query[x].dueDate, sanitizer.encodeEscape(queryData.query[x].task), queryData.query[x].complete, set[x]);
	}
}

function isArray(obj){
	return Object.prototype.toString.call(obj) === '[object Array]';
}

if (process.argv[2] != null || process.argv[2] != undefined)
{
	console.log(process.argv[2]);
	app.listen(process.argv[2]);
}
else
{
	try
	{
		app.listen(3000);
	}
	catch(err)
	{
		console.log("Chris Gross likes dicks");
	}
}
