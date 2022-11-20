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

function myPrintf(formatString, param){
	for(var i=0;i<formatString.length;i++){

		if ((formatString.charAt(i) == "#") && (formatString.charAt(i+1) !== "g")) {
			// console.log("zajrzalem");
			let beforeGchars = "";
			let j = i+1;
			let finalShiftedNumber = "";
			let singleNumberHolder = 0;


			while(formatString.charAt(j) != "g") {
				console.log("co tutaj", formatString.charAt(j));
				beforeGchars += formatString.charAt(j);
				j++;
			}

			if(param){
				let shiftedParam = param;

				if (shiftedParam.length > +beforeGchars) {
					shiftedParam = shiftedParam.substring(0, beforeGchars);
				}


				for(let letter of shiftedParam) {
					if(checkIfNumber(letter)) {
						singleNumberHolder = shiftNumber(+letter);
	
						finalShiftedNumber += singleNumberHolder;
					}
				}
				
				process.stdout.write(finalShiftedNumber);
	
				i++;
			}

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

