//Created By: Chien-Hung Chen, Christopher Gross, Davis Wilkinson, Alex Sevrain
//The code is provided AS-IS and is free to distribute, edit, and reuse with mentions of the original developers
//Used http://gskinner.com/RegExr/ to test regular expressions. Please verify for correctness.

//Strips HTML
exports.stripHTML = function(stringIn, granularity){
	if(granularity == "LOW")
		return stringIn.replace(/<(?:.|\n)*?>/gm, ''); //Strips everything in <> (inclusive)
	else //NEEDS TO BE FILLED IN
		return stringIn.replace(/<(?:.|\n)*?>/gm, ''); //Strips Javascript inside of <script> tags and CSS inside of <style> tags as well.
};

//Verifies Email
exports.verifyEmail = function(stringIn, granularity){
	if(granularity == "LOW") //only allow basic letters numbers and symbols
		return (stringIn.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/g) == 0); //Done ...ish
	else if(granularity == "MEDIUM") //also includes IPs in emails
		return (stringIn.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/g) == 0); //Need to implement still
	else if(granularity == "HIGH") //checks against all characters
		return (stringIn.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/g) == 0); 
		//return (stringIn.search(/\b[A-Za-z0-9"._%\\ /@;:,)(<>!#\$%&\^\?={}\|`~_\*'\+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/g) == 0); //not done yet, also something weird is not allowing the regex to be escaped correctly.
	else //default to LOW
		return (stringIn.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/g) == 0);
};

//Encode Escape
exports.encodeEscape = function(stringIn){
	return (escape(stringIn)); //This should be all we need
}

//Encode Unescape
exports.encodeUnescape = function(stringIn){
	return (unescape(stringIn)); //This should be all we need
}

//Encoding for URL
exports.encodeURL = function(stringIn){
	return (encodeURIComponent(stringIn)); //This should be all we need
}


//Strips SQL
exports.stripSQL = function(stringIn){
	stringIn = stringIn.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, ''); //removes "bad" SQL characters 
	return stringIn = stringIn.replace(/(\%27)|(\')|(\-\-)|(\%23)|(#)/ix,”); //detection of SQL meta-characters
 
};