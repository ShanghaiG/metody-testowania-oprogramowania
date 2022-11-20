#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding('utf8');

var lingeringLine = "";

function checkIfNumber (letter) {
		return /^\d+$/.test(letter);
}



function shiftNumber (singleNumber) {
	if(singleNumber === 0) {
		return 9;
	} else {
		return singleNumber-1;
	}
}

function getPartOfString (formatedString, part) {
	let parts = formatedString.split(" ");

	return parts[part];
}


function myPrintf(formatString, param){
	for(var i=0;i<formatString.length;i++){
		if((formatString.charAt(i) == '#') && (formatString.charAt(i+1) == 'g')){
			let finalShiftedNumber = "";
			let singleNumberHolder = 0;
			
			if(param){
				for(let letter of param) {
					if(checkIfNumber(letter)) {
						singleNumberHolder = shiftNumber(+letter);
	
						finalShiftedNumber += singleNumberHolder;
					}
				}
			
			process.stdout.write(finalShiftedNumber);

			i++;
		}
		}
		else if ((formatString.charAt(i) == "#") && (formatString.charAt(i+1) !== "g")) {
			let beforeGchars = "";
			let j = i+1;
			let finalShiftedNumber = "";
			let singleNumberHolder = 0;



			while(formatString.charAt(j) != "g") {

				if(formatString.charAt(j).match(/[a-z]/i)) {
	
					process.stdout.write(`${getPartOfString(formatString, 1)} ${getPartOfString(formatString, 2)}`);
					console.log("");
					return;
				}
				
				beforeGchars += formatString.charAt(j);
				j++;
			}

			if(param){
				let shiftedParam = param;

				for(let letter of param) {
					if(checkIfNumber(letter)) {
						singleNumberHolder = shiftNumber(+letter);
	
						finalShiftedNumber += singleNumberHolder.toString();
					}
				}

				if(beforeGchars[0] == "0") {
					if (shiftedParam.length < +beforeGchars) {
						let zeros = "";
						let parsedBeforeChars = +beforeGchars;
						let diff = Math.abs(shiftedParam.length - parsedBeforeChars);
	
						for(let i = 0; i< diff; i++) {
							zeros += "0";
						}
						finalShiftedNumber = zeros + finalShiftedNumber;
	
						process.stdout.write(`${finalShiftedNumber.toString()} ${getPartOfString(formatString, 2)}`);
						console.log("");
						return;
					}
	
					if(shiftedParam.length >= +beforeGchars) {
						process.stdout.write(`${finalShiftedNumber.toString()} ${getPartOfString(formatString, 2)}`);
						console.log("");
						return;
					}
				}

				if (shiftedParam.length < +beforeGchars) {
					let spaces = "";
					let parsedBeforeChars = +beforeGchars;
					let diff = Math.abs(shiftedParam.length - parsedBeforeChars);

					for(let i = 0; i< diff; i++) {
						spaces += " ";
					}
					finalShiftedNumber = spaces + finalShiftedNumber;

					process.stdout.write(`${finalShiftedNumber.toString()} ${getPartOfString(formatString, 2)}`);
					console.log("");
					return;
				}

				if(shiftedParam.length >= +beforeGchars) {
					process.stdout.write(`${finalShiftedNumber.toString()} ${getPartOfString(formatString, 2)}`);
					console.log("");
					return;
				}
				
	
				i++;
			}

		}
		else if ((formatString.charAt(i) == "#") && (checkIfNumber(formatString.charAt(i+1)))) {
			process.stdout.write(formatString.charAt(i));
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

