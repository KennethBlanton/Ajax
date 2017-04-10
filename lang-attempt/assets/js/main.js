console.log("Hello World from main.js!");

var a = {};
var words = function(str) {

var string = str;
	var words = string.split(" ");
	for (var i = 0; i < words.length; i++) {
		 var final = replacing(words[i])
		// let property = final.toUpperCase();	
	
		if(!a[final]) {
			a[final] = 0;
		}
		a[final] += 1;
	};
}
words("Hey. man whats up.");

var paragraphs = document.querySelectorAll("p");
for (var i = 0; i < paragraphs.length; i++) {
	words(paragraphs[i].innerHTML);
}
function replacing(string) {
	var noPeriod = string.replace(".", '');
	var noComma = noPeriod.replace(",", '');
	var noQuestion = noComma.replace("?", '');
	return noComma.toUpperCase();

};
// words("hey bro what it do");
