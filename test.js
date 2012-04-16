//Test.js is the main test file that does basic tests of the functionality of sanitizer.js for development sanity

var sanitizer = require('./sanitizer.js');


//Variables for testing
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
"</div>"+
"<div class=\"line\"></div>		<div class=\"main\">"+
    		"<h1 class=\"grayCopperplate\">About Me</h1>"+
			"<div class=\"contents\">"+
        		"<p>Hi, I'm Chien-Hung (Jeff) Chen, and I am a Computer Science student currently attending Case Western Reserve University. I will be receiving a Bachelors in Computer Science in May 2012 and a Masters in Computer Science in May 2013.</p>"+
                "<p>I have had an array of experiences in web development using Javascript, HTML5 and CSS3, C#.NET, VB.NET, PHP, Ruby On Rails. I have also had experience developing applications in C#, Java, and C. Lastly, I have also worked with a variety of databases including MySQL, PostgreSQL, SQL Server, and Oracle Database.</p>"+
                "<p>In the past year, I have recently started mobile development using Titanium SDK and Corona SDK and has deployed applications to iOS and Android devices.</p>"+
                "<p>Currently, I am splitting my time pursuing my BS/MS degrees, working at Formfire as a web developer, developing research projects at the Center of Clinical Investigation at Case Western Reserve University, and doing side projects as well (see my github and portfolio).</p>"+
    		"</div>"+
			"<div class=\"lightline\"></div>"+
    		"<div class=\"footer\">"+
	"<a href=\"/resume/\" class=\"top\">Resume</a>"+
	"<a href=\"/contact/\" class=\"top\">Contact</a>"+
"</div>		</div>"+
	"</div>"+
"</body>";

//Testing HTML
console.log("----------Testing HTML----------");
console.log(sanitizer.stripHTML(plainHTML));
console.log(sanitizer.stripHTML("IS"));
console.log(sanitizer.stripHTML("A"));
console.log(sanitizer.stripHTML("BAD"));
console.log(sanitizer.stripHTML("STRING"));