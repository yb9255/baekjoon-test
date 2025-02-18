const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split(' ');

const [iter, k] = input.map((val) => Number(val));

const queue = Array.from({ length: iter }, (_, index) => index + 1);
const answer = [];

let count = 1;

while (queue.length) {
  const shiftItem = queue.shift();

  if (count % k === 0) {
    answer.push(shiftItem);
    count = 1;
  } else {
    queue.push(shiftItem);
    count++;
  }
}

console.log(`<${answer.join(', ')}>`);

const queue2 = Array.from({ length: iter }, (_, index) => index + 1);
const answer2 = [];
let index = 0;

while (queue2.length) {
  index = (index + k - 1) % queue2.length;
  answer2.push(queue2.splice(index, 1)[0]);
}

console.log(`<${answer2.join(', ')}>`);
