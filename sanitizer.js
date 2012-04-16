//Created By: Chien-Hung Chen, Christopher Gross, Davis Wilkinson, Alex Sevrain
//The code is provided AS-IS and is free to distribute, edit, and reuse with mentions of the original developers

exports.stripHTML = function(stringIn){
	return stringIn.replace(/<(?:.|\n)*?>/gm, '');
};

exports.verifyEmail = function(stringIn){
	return (stringIn.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/g) == 0);
};