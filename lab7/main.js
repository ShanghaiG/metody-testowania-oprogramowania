#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding('utf8');

var lingeringLine = "";

function checkIfNumber (letter) {
		return /^\d+$/.test(letter);
}

function convertToHexadecimal(number) {
	let hexaDecimalString = number.toString(16);

	return hexaDecimalString;
}

function convertAFrangeToGM (hexaDecimalNumber) {
	let tempHexaDecimalNumber;

	tempHexaDecimalNumber = hexaDecimalNumber.split("");

	tempHexaDecimalNumber = tempHexaDecimalNumber.map((element) => {
		if(element >= "a" && element <= "f") {
			return getShiftedChar(element, 6);
		}
		return element;
	})


	return tempHexaDecimalNumber.join("");
}

function getShiftedChar(char, value) {
	return String.fromCharCode(char.charCodeAt(0) + value);
} 

function myPrintf(formatString, param){
	let stringArray = null;

	if(formatString.includes("#j")) {
		stringArray = formatString.split("#j");
	}


	if(stringArray.length !== 2) {
		process.stdout.write(formatString);
		console.log("");
		return;
	}

	const firstPartOfString = stringArray[0];

	let lastPartOfString  = stringArray[1].split(/j(.*)/s, 2);


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

	let hexaDecimalNumber;
	if(checkIfNumber(+parsedParam))  {
		hexaDecimalNumber = convertToHexadecimal(+parsedParam);
		hexaDecimalNumber = convertAFrangeToGM(hexaDecimalNumber);
	}

	process.stdout.write(`${firstPartOfString}${hexaDecimalNumber}${lastPartOfString}`);
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

