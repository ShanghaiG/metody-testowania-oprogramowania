#include <stdio.h>
#include <string.h>
#include <stdlib.h>


int my_printf(char *format_string, char *param){

    char arrayOutput[100];
    int helperFlag = 0;
    int arrayIndex = 0;
    int numberToPrint = 0;

    	for(int i=0;i<strlen(format_string);i++){

		if((format_string[i] == '#') && (format_string[i+1] == 'k')){
			i++;
			
			for(int j = 0; j<strlen(param); j++) {
			char letter = param[j];
			
			
				if(letter >= 65 && letter <= 90) {
				   param[j] = letter + 32;
				}
				
				if (letter >= 97 && letter <= 122) {
				   param[j] = letter - 32;
				}
			}
			
			printf("%s",param);
		}  
        else if ((format_string[i] == '#') && (format_string[i+1] == '.')){
            i++;
            helperFlag = 1;
        }
        else {

            if(!helperFlag) {
                putchar(format_string[i]);
            }

			
        }

        if(helperFlag == 1) {
            char c = format_string[i];

            if(c >= 48 && c <= 57){
                arrayOutput[arrayIndex] = c;
                arrayIndex++;
            }

            if (c == 'k'){
                helperFlag = 0;

                numberToPrint = atoi(arrayOutput);
            }
        }

        if(numberToPrint){
            int paramLength = strlen(param);

            for(int i = 0; i < numberToPrint; i++) {
                if(i >= paramLength) {
                    break;
                }

                if(param[i] >= 65 && param[i] <= 90){
                        printf("%c", param[i] + 32);
                    }
                    
                if (param[i] >= 97 && param[i] <= 122){
                        printf("%c", param[i] - 32);
                    }
            }
            numberToPrint = 0;

        }
        
	}
}

int main(int argc, char *argv[]){
	char buf[1024],buf2[1024];
	while(fgets(buf, 1024, stdin)){
		fgets(buf2, 1024, stdin);
		buf[strlen(buf)-1] = '\0';
		buf2[strlen(buf2)-1] = '\0';
		my_printf(buf,buf2);
	}
	return 0;
}
