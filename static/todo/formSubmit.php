<?php
	include ('config.php'); //necessary for info
	session_start(); //start a sessions
	
	$connection = mysql_connect($server, $user, $pw); //connect to the db
	
	$currentdate = "CURDATE()"; //set current date to MYSQL CURDATE()
	
	//variables used throughout
	$tasks = array(); //holds all our tasks after query
	$dueDates = array(); //holds all our due dates after query
	$creationDates = array(); //holds all creation dates
	$delete = array(); //delete options
	$complete = array(); //holds if task is complete
	
	$x = 0; //loop var
	$isSet = true; //used for session vars
	
	if (!$connection) //if we couldn't connect
		printf ("Connection Error. Check \"config.php\"");
	else	
		mysql_select_db('todo', $connection); //awesome we are connected
	
	if ($_POST['task'] != '')
	{
			$due = $_POST["due"];
			$task = $_POST["task"];
			
			if (!insertData($currentdate, "'".$due."'", "'".$task."'", 0))
				printf("Error on insert");
	}
	
	$query = mysql_query("SELECT * FROM todoList", $connection);
	
	while ($row = mysql_fetch_array($query, MYSQL_BOTH)) 
	{
		array_push($creationDates, $row[0]);
		array_push($dueDates, $row[1]);
		array_push($tasks, $row[2]);
		array_push($complete, $row[3]);
		$x++;  
	}
	
	function updateData($createDate, $dueDate, $task, $complete, $set)
	{			   
		return mysql_query("UPDATE todoList SET ".$set." WHERE task = '".$task."'
			AND creationDate = '".$createDate."'
			  AND dueDate = '".$dueDate."'
			   AND complete = '".$complete."'");
	}
	
	function deleteData ($createDate, $dueDate, $task, $complete)
	{
		return mysql_query("DELETE FROM todoList WHERE task = '".$task."'
			AND creationDate = '".$createDate."'
			  AND dueDate = '".$dueDate."'
			   AND complete = '".$complete."'");
	}
	
	function insertData ($createDate, $dueDate, $task, $complete)
	{
		return mysql_query("INSERT INTO todoList (creationDate, dueDate, task, complete) 
			VALUES (".$createDate.", ".$dueDate.", ".$task.", ".$complete.")");
	}	
			
	for ($x = 0; $x < count($creationDates); $x++)
	{			
		$statement = "";
		$update= false;
	
		if ($_POST['delete'.$x] == '0')
		{				
			if (!deleteData($creationDates[$x], $dueDates[$x], $tasks[$x], $complete[$x]))
				echo "delete failed";
		}
		else if (formatString($tasks[$x]) != formatString($_POST['task'.$x]) && $_POST['task'.$x] != '')
		{
			$update = true;
			echo formatString($tasks[$x]);
			$statement =  $statement." task = '".formatString($_POST['task'.$x])."'";
		}
	
		$checkedVal = $_POST['complete'.$x] == "on" ? 1 : 0;
	
		if ( $checkedVal != $complete[$x])
		{
			$update = true;
			$statement =  $statement." complete = '".$checkedVal."'";
		}
		if (formatString($dueDates[$x]) != formatString($_POST['due'.$x]) && $_POST['due'.$x] != '')
		{
			$update = true;
			$statement =  $statement." dueDate = '".($_POST['due'.$x])."'";
		}
		if ($update)
		{
			if (!updateData($creationDates[$x], $dueDates[$x], $tasks[$x], $complete[$x], $statement))
				printf("ERROR ON UPDATE");
		}
	}
		
		
	function formatString($string)
	{
		$string = stripslashes($string);
		$string = addslashes($string);
		$string = str_replace ("\"", "&quot;", $string);
		$string = str_replace ("\'", "&#39;", $string); 
		return ($string);
	}
	
	header( 'Location: index.php' );
?>