//Test.js is the main test file that does basic tests of the functionality of sanitizer.js for development sanity

var sanitizer = require('./sanitizer.js');

console.log(sanitizer.stripHTML("<div class=\"menu\"><ul><li><a href=\"/education/\"><span class=\"menuLong\">Education</span><span class=\"menuShort\">Edu</span></a></li></ul></div>"));
console.log(sanitizer.stripHTML("AM"));
console.log(sanitizer.stripHTML("A"));
console.log(sanitizer.stripHTML("BAD"));
console.log(sanitizer.stripHTML("STRING"));