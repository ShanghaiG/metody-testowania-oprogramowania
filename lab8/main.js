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
		if(element === "0") {
			return "o";
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

	let hashSplitArray  = formatString.split("#");

	const firstPartOfString = hashSplitArray[0];

	let secondStringArray  = firstPartOfString[1].split(/j(.*)/s, 2);

	
	let numberOfElements = secondStringArray[0];


	let lastPartOfString  = secondStringArray[1];


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

	let hexaDecimalNumber = "";
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

