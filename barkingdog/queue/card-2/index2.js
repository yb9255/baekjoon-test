const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const queue = Array.from({ length: N }, (_, idx) => idx + 1);
let front = 0;

while (front < queue.length - 1) {
  front++;
  queue.push(queue[front++]);
}

console.log(queue[front]);
