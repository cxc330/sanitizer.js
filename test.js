//Test.js is the main test file that does basic tests of the functionality of sanitizer.js for development sanity

var sanitizer = require('./sanitizer.js');
var colors = require('colors');


/*Variables for testing
------------------------------------------------------------*/

//emails
var goodEmails = [];
goodEmails.push("niceandsimple@example.com");
goodEmails.push("simplewith+symbol@example.com");
goodEmails.push("less.common@example.com");
goodEmails.push( "a.little.more.unusual@dept.example.com");
goodEmails.push("'@[10.10.10.10]");
goodEmails.push("user@[IPv6:2001:db8:1ff::a0b:dbd0]");
goodEmails.push( "\"much.more\ unusual\"@example.com");
goodEmails.push( "\"very.unusual.@.unusual.com\"@example.com");
goodEmails.push( "\"very.(),:;<>[]\\\".VERY.\\\"very@\\\ \\\"very\\\".unusual\\\"@strange.example.com");
goodEmails.push( "0@a");
goodEmails.push( "!#$%&'*+-/=?^_`{}|~@example.org");
goodEmails.push( "\"()<>[]:;@,\\\\\"!#$%&'*+-/=?^_`{}|\ \ \ \ \ ~\ \ \ \ \ \ \ ?\ \ \ \ \ \ \ \ \ \ \ \ ^_`{}|~.a\"@example.org");
goodEmails.push( "\"\"@example.org");
goodEmails.push( "postbox@com");

var badEmails = [];
badEmails.push("Abc.example.com");
badEmails.push("Abc.@example.com");
badEmails.push("Abc..123@example.com");
badEmails.push("A@b@c@example.com");
badEmails.push("a\"b(c)d,e:f;g<h>i[j\\k]l@example.com");
badEmails.push("just\"not\"right@example.com");
badEmails.push("this is\"not\\allowed@example.com");
badEmails.push("this\\ still\\\"not\\\\allowed@example.com");

//HTML
var plainHTML = "<body>\n"+
	"<div class=\"wrapper\">\n"+
		"\t<div class=\"header\">\n"+
	"<a href=\"/\" class=\"title grayCopperplate\">Chien-Hung Chen</a>\n"+
	"<div class=\"menu\">\n"+
		"\t<ul>\n"+
			"\t\t<li><a href=\"/\"><span class=\"menuLong\">About Me</span><span class=\"menuShort\">About</span></a></li>\n"+
			"\t\t<li><a href=\"/experience/\"><span class=\"menuLong\">Experience</span><span class=\"menuShort\">Work</span></a></li>\n"+
			"\t\t<li><a href=\"/techskills/\"><span class=\"menuLong\">Tech Skills</span><span class=\"menuShort\">Skills</span></a></li>\n"+
			"\t\t<li><a href=\"/portfolio/\"><span class=\"menuLong\">Portfolio</span><span class=\"menuShort\">Folio</span></a></li>\n"+
			"\t\t<li><a href=\"/education/\"><span class=\"menuLong\">Education</span><span class=\"menuShort\">Edu</span></a></li>\n"+
		"\t</ul>\n"+
	"\t</div>\n"+
"</div>\n";

var scriptsInHTML = "<head>"+
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"+
        "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n"+
        "<link rel=\"icon\" href=\"/assets/images/favicon.ico\">\n"+
        "<script language=\"javascript\" type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js\"></script>\n"+
        "<!--[if lt IE 9]>\n"+
	        "\t<script src=\"http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js\"></script>\n"+
        "<![endif]-->\n"+
        "<script type=\"text/javascript\">\n"+
          "\tvar _gaq = _gaq || [];\n"+
          
          "\t_gaq.push(['_setAccount', 'UA-30879788-1']);\n"+
          "\t_gaq.push(['_trackPageview']);\n"+
          
          "\t(function() {\n"+
            "\t\tvar ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\n"+
            "\t\tga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';\n"+
            "\t\tvar s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\n"+
          "\t})();\n"+
        "</script>\n"+
        "<link rel=\"stylesheet\" type=\"text/css\" href=\"/assets/css/style.css\" />	<title>Home - Chien-Hung Chen</title>\n"+
"</head>\n";

//Strings with Special Characters to Encode and Decode
var stringWithSpecialCharacters = "Hello World! Hello EECS444 $#%";
//URL Encode and Decode
var url = "http://w3schools.com/my test.asp?name=ståle&car=saab";

/*Calling sanitizer.js to test
------------------------------------------------------------*/

//Testing Email
console.log("\n----------Testing Good Emails----------\n".green);
for(var i = 0; i < goodEmails.length; i++)
{
	if(sanitizer.verifyEmail(goodEmails[i]))
		console.log("Good: ".green + goodEmails[i]);
	else
		console.log("Bad: ".red + goodEmails[i]);
}
console.log("\n----------Testing Bad Emails----------\n".red);
for(var i = 0; i < badEmails.length; i++)
{
	if(sanitizer.verifyEmail(badEmails[i]))
		console.log("Good: ".green + badEmails[i]);
	else
		console.log("Bad: ".red + badEmails[i]);
}

//Testing HTML
console.log("\n----------Testing HTML----------\n".magenta);
console.log("Before: " + plainHTML + "\n");
console.log("After: " + sanitizer.stripHTML(plainHTML) + "\n");
console.log("\n----------Testing HTML & SCRIPT Tags----------\n".rainbow);
console.log("Before: " + scriptsInHTML + "\n");
console.log("After: " + sanitizer.stripHTML(scriptsInHTML) + "\n");


//Testing Encode and Decode
console.log("\n----------Testing Encode and Decode----------\n".magenta);
console.log("Before: " + stringWithSpecialCharacters + "\n");
console.log("After Encode: " + encode(stringWithSpecialCharacters) + "\n");
console.log("After Decode: " + decode(stringWithSpecialCharacters) + "\n");
console.log("\n----------Testing Encode and Decode URL----------\n".magenta);
console.log("Before: " + url + "\n");
console.log("After Encode: " + encode(url, "URL") + "\n");
console.log("After Decode: " + decode(url, "URL") + "\n");