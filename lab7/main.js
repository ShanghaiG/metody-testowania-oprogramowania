#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding('utf8');

var lingeringLine = "";

function checkIfNumber (letter) {
		return /^\d+$/.test(letter);
}


function changeNumber (singleNumber, shouldBeChanged) {
	if(singleNumber === 0) {
		return 9;
	} 
	else if (singleNumber && shouldBeChanged) {
		const newNumber = (((singleNumber * 9) + 1) %10);
		return newNumber;
	}
	else {
		return singleNumber-1;
	}
}

function myPrintf(formatString, param){
	let shouldBeChanged = false;

	let firstStringArray = null;

	if(formatString.includes("#.")) {
		firstStringArray = formatString.split("#.");
	
		shouldBeChanged = firstStringArray.length !== 2 ? false : true;
	} else {
		firstStringArray = formatString.split("#");
	}

	
	if(firstStringArray.length < 2) {
		process.stdout.write(formatString);
		console.log("");
		return;
	}

	const firstPartOfString = firstStringArray[0];

	let secondStringArray  = firstStringArray[1].split(/g(.*)/s, 2);

	if(secondStringArray.length < 2) {
		process.stdout.write(formatString);
		console.log("");
		return;
	}

	const lastPartOfString = secondStringArray[1];

	let numbers = 0;

	let fillWith = null;

	if(checkIfNumber(secondStringArray[0])) {
		numbers = +secondStringArray[0];

		fillWith = secondStringArray[0].startsWith("0") ? "0" : " ";
	}	

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

	for(let letter of parsedParam) {
		if(checkIfNumber(letter)){
			finalNumber += changeNumber(+letter, shouldBeChanged);
		} else {
			break; 
		}
		
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

