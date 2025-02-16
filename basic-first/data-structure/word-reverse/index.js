const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');

const [lineCount, ...sentences] = input;

// 풀이 1

let answer = '';

for (let i = 0; i < lineCount; i++) {
  const sentence = sentences[i].split(' ');
  const reverseSentence = sentence.map((word) =>
    word.split('').reverse().join(''),
  );

  answer += `${reverseSentence.join(' ')}\n`;
}

console.log(answer.trim());

answer = '';

// 풀이 2

for (const sentence of sentences) {
  let reverseWord = '';

  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i];
    const isSpace = char === ' ';

    if (isSpace) {
      answer += `${reverseWord} `;
      reverseWord = '';
      continue;
    }

    reverseWord = char + reverseWord;
  }

  answer += `${reverseWord}\n`;
}

console.log(answer.trim());
