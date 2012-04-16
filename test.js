//Test.js is the main test file that does basic tests of the functionality of sanitizer.js for development sanity

var sanitizer = require('./sanitizer.js');


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

//HTML
var plainHTML = "<body>"+
	"<div class=\"wrapper\">"+
		"<div class=\"header\">"+
	"<a href=\"/\" class=\"title grayCopperplate\">Chien-Hung Chen</a>"+
	"<div class=\"menu\">"+
		"<ul>"+
			"<li><a href=\"/\"><span class=\"menuLong\">About Me</span><span class=\"menuShort\">About</span></a></li>"+
			"<li><a href=\"/experience/\"><span class=\"menuLong\">Experience</span><span class=\"menuShort\">Work</span></a></li>"+
			"<li><a href=\"/techskills/\"><span class=\"menuLong\">Tech Skills</span><span class=\"menuShort\">Skills</span></a></li>"+
			"<li><a href=\"/portfolio/\"><span class=\"menuLong\">Portfolio</span><span class=\"menuShort\">Folio</span></a></li>"+
			"<li><a href=\"/education/\"><span class=\"menuLong\">Education</span><span class=\"menuShort\">Edu</span></a></li>"+
		"</ul>"+
	"</div>"+
"</div>";

var scriptsInHTML = "<head>"+
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"+
        "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"+
        "<link rel=\"icon\" href=\"/assets/images/favicon.ico\">"+
        "<script language=\"javascript\" type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js\"></script>"+
        "<!--[if lt IE 9]>"+
	        "<script src=\"http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js\"></script>"+
        "<![endif]-->"+
        "<script type=\"text/javascript\">"+
          "var _gaq = _gaq || [];"+
          
          "_gaq.push(['_setAccount', 'UA-30879788-1']);"+
          "_gaq.push(['_trackPageview']);"+
          
          "(function() {"+
            "var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;"+
            "ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';"+
            "var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);"+
          "})();"+
        "</script>"+
        "<link rel=\"stylesheet\" type=\"text/css\" href=\"/assets/css/style.css\" />	<title>Home - Chien-Hung Chen</title>"+
"</head>";

/*Calling sanitizer.js to test
------------------------------------------------------------*/

//Testing Email
console.log("\n----------Testing Email----------\n");
for(var i = 0; i < goodEmails.length; i++)
{
	if(sanitizer.verifyEmail(goodEmails[i]))
		console.log("Good: " + goodEmails[i]);
	else
		console.log("Bad: " + goodEmails[i]);
}

//Testing HTML
console.log("\n----------Testing HTML----------\n");
console.log(sanitizer.stripHTML(plainHTML));
console.log(sanitizer.stripHTML(scriptsInHTML));