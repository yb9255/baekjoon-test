/** https://www.acmicpc.net/problem/3613 */
const variableName = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const isCPP = variableName.includes('_');
const isJava = /[A-Z]/.test(variableName);
const isLowerFirst = 'a' <= variableName[0] && 'z' >= variableName[0];

if (isCPP && isJava) {
  console.log('Error!');
  process.exit();
}

if (!isLowerFirst) {
  console.log('Error!');
  process.exit();
}

const answer = [];

if (isCPP) {
  if (
    variableName[0] === '_' ||
    variableName[variableName.length - 1] === '_' ||
    variableName.includes('__')
  ) {
    console.log('Error!');
    process.exit();
  }

  const words = variableName.split('_');
  answer.push(words[0]);

  for (let i = 1; i < words.length; i++) {
    let changed = '';
    const word = words[i];

    for (let j = 0; j < word.length; j++) {
      if (j === 0) {
        changed += word[j].toUpperCase();
      } else {
        changed += word[j];
      }
    }

    answer.push(changed);
  }
} else if (isJava) {
  const checkIsUpper = (char) => 'A' <= char && 'Z' >= char;

  for (let i = 0; i < variableName.length; i++) {
    const char = variableName[i];

    if (checkIsUpper(char)) {
      answer.push('_');
      answer.push(char.toLowerCase());
    } else {
      answer.push(char);
    }
  }
} else {
  answer.push(variableName);
}

console.log(answer.join(''));
