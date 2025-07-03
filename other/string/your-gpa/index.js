const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const gradeMap = {
  'A+': 4.5,
  A0: 4.0,
  'B+': 3.5,
  B0: 3.0,
  'C+': 2.5,
  C0: 2.0,
  'D+': 1.5,
  D0: 1.0,
  F: 0.0,
};

let totalCredit = 0;
let totalGrade = 0;

for (let i = 0; i < input.length; i++) {
  const [, credit, grade] = input[i];
  if (grade === 'P') continue;

  totalCredit += +credit;
  totalGrade += gradeMap[grade] * +credit;
}

console.log(totalGrade / totalCredit);
