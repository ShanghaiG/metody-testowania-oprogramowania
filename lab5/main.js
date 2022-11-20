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
			// console.log("zajrzalem");
			let beforeGchars = "";
			let j = i+1;
			let finalShiftedNumber = "";
			let singleNumberHolder = 0;


			while(formatString.charAt(j) != "g") {
				
				beforeGchars += formatString.charAt(j);
				j++;
			}

			if(param){
				let shiftedParam = param;

				// if(beforeGchars[0] == "0") {
				// 	if (shiftedParam.length < +beforeGchars) {
				// 		shiftedParam = shiftedParam.substring(0, beforeGchars);
				// 	}
				// }


	
				// console.log("shiftedParam to", shiftedParam);

				for(let letter of param) {
					if(checkIfNumber(letter)) {
						singleNumberHolder = shiftNumber(+letter);
	
						finalShiftedNumber += singleNumberHolder.toString();
					}
				}
				console.log("co w finalShiftedNumber", finalShiftedNumber);

				if (shiftedParam.length < +beforeGchars) {
						finalShiftedNumber = (+beforeGchars-shiftedParam.length)* " " + finalShiftedNumber;
				}
				
				process.stdout.write(finalShiftedNumber.toString());
	
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

