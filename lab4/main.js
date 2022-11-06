#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding('utf8');

var lingeringLine = "";

function checkIfNumber (letter) {
		return /^\d+$/.test(letter);
}

function reverseString (passedString) {
	return passedString.split("").reverse().join("");
}

function myPrintf(formatString, param){
	for(var i=0;i<formatString.length;i++){
		if((formatString.charAt(i) == '#') && (formatString.charAt(i+1) == 'g')){
			let newNumber = "";
		
			for(let letter of param) {
				if(checkIfNumber(letter)) {
					newNumber += letter;
				}
			}
			newNumber = reverseString(newNumber);

			process.stdout.write(newNumber);

			i++;
		}
		else{
			process.stdout.write(formatString.charAt(i));
		}
	}

	console.log("");
}

process.stdin.on('data', function(chunk) {
	lines = chunk.split("\n");

	lines[0] = lingeringLine + lines[0];
	lingeringLine = lines.pop();
	for(var i=0;i<lines.length;i++){
		myPrintf(lines[i],lines[i+1])
		i++;
	}

});

