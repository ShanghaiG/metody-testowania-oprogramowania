#include <stdio.h>
#include <string.h>

int my_printf(char *format_string, char *param){
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
		}else
			putchar(format_string[i]);
	}
	puts("");
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
