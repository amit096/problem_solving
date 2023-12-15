/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false
  if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another,
    such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length != str2.length) return false;
  let map = new Map();
  for (let i = 0; i < str1.length; i++) {
    let val = str1[i].toUpperCase();
    if (!map.get(val)) {
      map.set(val, 1);
    } else {
      let lastValue = map.get(val);
      map.set(val, lastValue + 1);
    }
  }

  for (let i = 0; i < str2.length; i++) {
    let val = str2[i].toUpperCase();
    if (!map.get(val)) {
      return false;
    }
  }
  return true;
}

module.exports = isAnagram;
