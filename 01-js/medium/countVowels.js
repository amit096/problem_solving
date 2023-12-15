/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    let map={'a':1,'e':1,'i':1,'o':1,'u':1};
    let count =0;
    for(let i=0;i<str.length;i++){
      let val = str[i].toLowerCase();
     if(map[val]){
      count++;
     }
    }
    return count;
}

module.exports = countVowels;