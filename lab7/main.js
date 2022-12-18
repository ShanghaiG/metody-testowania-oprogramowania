#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding('utf8');

var lingeringLine = "";

function checkIfNumber (letter) {
		return /^\d+$/.test(letter);
}

function convertToHexadecimal() {

}


function myPrintf(formatString, param){
	let firstStringArray = null;

	if(formatString.includes("#j")) {
		firstStringArray = formatString.split("#j");
	}

	if(firstStringArray.length < 2) {
		process.stdout.write(formatString);
		console.log("");
		return;
	}

	const firstPartOfString = firstStringArray[0];

	let secondStringArray  = firstStringArray[1].split(/j(.*)/s, 2);

	if(secondStringArray.length < 2) {
		process.stdout.write(formatString);
		console.log("");
		return;
	}

	const lastPartOfString = secondStringArray[1];

	let numbers = 0;

	let fillWith = null;


	let finalNumber = "";

	let parsedParam = param;

	if(!parsedParam) {
		process.stdout.write(`${firstPartOfString}${"testy"}${lastPartOfString}`);
		console.log("");
		return;
	}

	if(!parsedParam.charAt(0).match(/[0-9]/i)) {
		process.stdout.write(`${firstPartOfString}${0}${lastPartOfString}`);
		console.log("");
		return;
	}


	const replacedString = finalNumber.padStart(numbers, fillWith);

	process.stdout.write(`${firstPartOfString}${replacedString}${lastPartOfString}`);
	console.log("");
	return;
	
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

