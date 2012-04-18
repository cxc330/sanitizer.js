#Santizer.js

Sanitizer.js is a JavaScript Library designed to help sanitize your string inputs. Currently being developed for a Computer Security class. The idea is this JavaScript Library will be useful to do some client-side sanitization (not 100% secure because it IS on client side), and will definitely be useful for Node.js development.

This project is open-source and open to be modified.

##Developed By
- Chien-Hung Chen
- Christopher Gross
- Alexandre Sevrain
- Davis Wilkinson

##Description of Files
Important files you need to understand are:

- sanitizer.js
- todo.js
- test.js

- sanitizer.js
	This file holds all of the functions for our sanitizer library.

- todo.js
	This file is the main application file for the sample application we've attached, a To-Do List web application.

- test.js
	This file is the application file for a basic test program to test the sanitizer library.
	
##How To Run
###Sample Application - To-Do List
####Dependencies and Packages
To use this package please make sure to install mysql, jade and express from npm.

    npm install mysql
	npm install express
	npm install jade
	npm install jquery


####Running the To-Do List
To run this please use the command

    node todo.js 3000

Where the 3000 can be any open port you want.

####Seeing and using the To-Do List
To use the To-Do List web application, go to http://yourservername.com:portnumber/todo/

###Using Test.js
####Description
Test.js is a console-based application used to test the sanitizer.js library. This program has hard coded examples of inputs and sample outputs.

####Running Test.js
To run test.js, simply:

	node test.js


##Sanitizer.js Breakdown