/*
  Implement a function `isPalindrome` which takes a string as argument and returns 
  true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' 
  is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
 
  str=str.toLowerCase().split(' ').join('');

  for(let i=0,j=str.length-1;i<j;i++,j--){
    let leftChar= str[i].charCodeAt(0);
    let rightChar= str[j].charCodeAt(0);

    while((leftChar<97 || leftChar>122) && i<j){
     i++;
     leftChar=str[i].charCodeAt(0);
    }

    while((rightChar<97 || rightChar>122) && i<j){
      j--;
      rightChar=str[j].charCodeAt(0);
     }

    if(leftChar!=rightChar) return false;
  }
  return true;
}

module.exports = isPalindrome;


//charCodeAt