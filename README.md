#Santizer.js

- Description
	- Sanitizer.js is a JavaScript Library designed to help sanitize your string inputs. Currently being developed for a Computer Security class. The idea is this JavaScript Library will be useful to do some client-side sanitization (not 100% secure because it IS on client side), and will definitely be useful for Node.js development.
	- This project is open-source and open to be modified.

- Developers
	- Chien-Hung Chen
	- Christopher Gross
	- Alexandre Sevrain
	- Davis Wilkinson

##Description of Files
Important files you need to understand are:

- sanitizer.js
	- This file holds all of the functions for our sanitizer library.

- todo.js
	- This file is the main application file for the sample application we've attached, a To-Do List web application.

- test.js
	- This file is the application file for a basic test program to test the sanitizer library.
	
##How To Run
###Sample Application - To-Do List
####Dependencies and Packages
To use this package please make sure to install mysql, jade and express from npm.

    npm install mysql
    npm install express
    npm install jade
    npm install jquery
    npm install colors

####Running the To-Do List
To run this please use the command

    node todo.js 3000

Where the 3000 can be any open port you want.

####Seeing and using the To-Do List
To use the To-Do List web application, go to http://yourserver.url:portnumber/todo/

Please also create a file called

       login.js

with fields

       exports.pw = "mypassword";
       exports.user = "myusername";


###Using Test.js
####Description
Test.js is a console-based application used to test the sanitizer.js library. This program has hard coded examples of inputs and sample outputs.

####Running Test.js
To run test.js, simply:

	node test.js


##Sanitizer.js Manual
- sanitizer.stripHTML(string)
	- This strips HTML tags out of the string.
- sanitizer.verifyEmail(string)
	- This is a utility function for developers to verify that the input is a valid email
- sanitizer.encode(string)
	- This encodes the special characters.
	- By passing in a optional parameter, you can make this encode URLs such that the address is still intact.
- sanitizer.decode(string)
	- This decodes what you encoded with sanitizer.encode(). Works for URLs as well.
- sanitizer.stripSQL(string)
	- Currently, this is an aggressive function that will strip out key words of SQL. Further along, it will be smarter and escape characters and check key words correctly such that it will allow the words the pass through to the database after it has been sanitized.