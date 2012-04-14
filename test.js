//Test.js is the main test file that does basic tests of the functionality of sanitizer.js for development sanity

var sanitizer = require('./sanitizer.js');

console.log(sanitizer.test("I"));
console.log(sanitizer.test("AM"));
console.log(sanitizer.test("A"));
console.log(sanitizer.test("BAD"));
console.log(sanitizer.test("STRING"));